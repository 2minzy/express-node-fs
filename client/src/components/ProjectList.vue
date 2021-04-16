<template>
  <div class="movies">
    <h1>영화 목록</h1>
    <div class="container">
      <div class="outer">
        <div class="inner">
          <div class="centered" v-for="project in projects" :key="project.id">
            <img v-bind:src="project.poster" class="poster" />
            <div>
              <strong>{{ project.name }}</strong> -
              <i>{{ project.director }}</i> [{{ project.year }}]
              <router-link
                :to="{ name: 'detailproject', params: { id: project.id } }"
                >더보기</router-link
              >
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

export default {
  name: 'projectlist',
  setup() {
    const projects = ref(null);

    const fetchData = async () => {
      try {
        let response = await axios.get('http://localhost:3000/api/projects');
        console.log(response.data);
        projects.value = response.data;
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      projects,
      fetchData,
    };
  },
};
</script>
<style>
.outer {
  display: table;
  width: 100%;
  height: 100%;
}
.inner {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.centered {
  position: relative;
  display: inline-block;
  width: 50%;
  padding: 1em;
  font-size: 1.5em; /* background: orange; */ /* color: white; */
}
.poster {
  width: 30%;
  height: 40%;
}
</style>
