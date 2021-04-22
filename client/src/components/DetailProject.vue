<template>
  <div>
    <h1>상세 내용</h1>
    <div class="container">
      <div class="outer">
        <div class="inner">
          <div class="centered">
            <img v-if="project" v-bind:src="project.poster" class="poster" />
            <div>
              <strong v-if="project">{{ project.name }}</strong> -
              <i v-if="project">{{ project.director }}</i>
              <p v-if="project">[{{ project.year }}]</p>
              <p v-if="project">{{ project.description }}</p>
              <router-link :to="{ name: 'projectlist' }">돌아가기</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'detailproject',
  setup() {
    const project = ref(null);
    const route = useRoute();

    const fetchData = async () => {
      try {
        const id = route.params.id;
        const response = await axios.get(
          `http://localhost:3000/api/projects/${id}`
        );
        project.value = response.data[0];
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(() => {
      fetchData();

    });

    return {
      project,
      fetchData,
    };
  },
};
</script>
