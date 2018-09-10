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

    <img alt="Vue logo" src="../assets/logo.png" @click="translateThatMothaFooka">

    <!-- <SpeakToMe /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import SpeakToMe from '@/components/SpeakToMe.vue'; // @ is an alias to /src
import axios from 'axios';

@Component({
  // components: {
  //   SpeakToMe
  // }
})
export default class Speak extends Vue {
  input = '';
  output = '';

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
