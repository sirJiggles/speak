<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    

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
  public async mounted() {
    // connect to the BE and grab the translate response!
    try {
      const results = await axios.post('http://localhost:3000/translate', {
        text: 'Hey how are you doing',
        format: { from: 'en', to: 'de' }
      });

      console.log(results.data.text);
    } catch (err) {
      console.log('error from the server', err);
    }
  }
}
</script>
