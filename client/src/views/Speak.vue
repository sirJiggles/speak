<template>
  <div class="home">

    <h1>
      Input text
    </h1>
    <textarea v-model="input" rows="10" cols="60" placeholder="Type some awesome text"></textarea>

    <h2>Output text</h2>

    <textarea v-model="output" rows="10" cols="60" placeholder="get some aweomse result">
    </textarea>

    <br />
    <br />

    <button @click="clickSpeak" :disbled=translating>
      {{speakButtonText}}
    </button>

    <br />
    <br />

    <button @click="translateThatMothaFooka">Translate</button>

    <!-- <img alt="Vue logo" src="../assets/logo.png" @click="translateThatMothaFooka"> -->

    <!-- <SpeakToMe /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import SpeakToMe from '@/components/SpeakToMe.vue'; // @ is an alias to /src
import axios from 'axios';

// import io from 'socket.io-client';

@Component({
  // components: {
  //   SpeakToMe
  // }
})
export default class Speak extends Vue {
  input = '';
  output = '';
  listeningToAudio = false;
  translating = false;
  // socket = io({
  //   host: '192.168.0.164',
  //   hostname: 'localhost',
  //   port: '8080'
  // });

  // used for speach recognition
  SpeechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition;
  recognition = new this.SpeechRecognition({
    lang: 'en-US',
    interimResults: false
  });

  // get translating() {
  //   return !listeningToAudio
  // };

  get speakButtonText() {
    return this.listeningToAudio ? 'Stop' : 'Speak';
  }

  public mounted() {
    this.recognition.addEventListener('result', (e: any) => {
      const last = e.results.length - 1;
      const text = e.results[last][0].transcript;
      const confidance = e.results[0][0].confidence;

      if (confidance > 0.7) {
        // update the input field with what the user wants to send
        this.input = text;
        this.$socket.emit('chat message', text);
      } else {
        // TODO handle the case that we could not hear the user
      }

      this.listeningToAudio = false;
    });
  }

  clickSpeak() {
    if (!this.listeningToAudio) {
      this.recognition.start();
    } else {
      this.recognition.stop();
    }

    this.listeningToAudio = !this.listeningToAudio;
  }

  async translateThatMothaFooka() {
    // connect to the BE and grab the translate response!
    try {
      const results = await axios.post('http://localhost:3000/translate', {
        text: this.input,
        format: { from: 'en', to: 'de' }
      });

      this.output = results.data.text;
    } catch (err) {
      console.log('error from the server', err);
    }
  }
}
</script>
