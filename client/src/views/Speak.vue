<template>
  <div class="home">

    <h1>
      Input
    </h1>
    <textarea v-model="input" rows="10" cols="60" placeholder="Type some awesome text"></textarea>

    <h2>Output</h2>

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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({})
export default class Speak extends Vue {
  input = '';
  output = '';
  listeningToAudio = false;
  translating = false;

  // used for speach recognition
  SpeechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition;
  recognition = new this.SpeechRecognition({
    lang: 'en-US',
    interimResults: false
  });

  // for talking back
  synth = window.speechSynthesis;
  utterance = new SpeechSynthesisUtterance();

  // get translating() {
  //   return !listeningToAudio
  // };

  get speakButtonText() {
    return this.listeningToAudio ? 'Stop' : 'Speak';
  }

  public mounted() {
    this.$socket.on('bot reply', replyText => {
      this.synthVoice(replyText);
      this.output = replyText;
    });

    // talk back lang
    // this.utterance.lang = 'de-DE';

    this.recognition.addEventListener('result', (e: any) => {
      const last = e.results.length - 1;
      const text = e.results[last][0].transcript;
      const confidance = e.results[0][0].confidence;

      this.utterance.lang = 'en-US';

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

      this.utterance.lang = 'de-DE';

      this.output = results.data.text;
      this.synthVoice(results.data.text);

      // this.$socket.emit('chat message', this.input);
    } catch (err) {
      console.log('error from the server', err);
    }
  }

  private synthVoice(text: string) {
    this.utterance.text = text;
    this.synth.speak(this.utterance);
  }
}
</script>
