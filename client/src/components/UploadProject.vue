<template>
  <div>
    <form method="post" @submit.stop.prevent="onSubmit">
      <div>
        <label for="name">영화 제목</label>
        <input type="text" name="name" required v-model="project.name" />
      </div>
      <div>
        <label for="year">개봉 년도</label>
        <input type="number" name="year" required v-model="project.year" />
      </div>
      <div>
        <label for="director">감독</label>
        <input
          type="text"
          name="director"
          required
          v-model="project.director"
        />
      </div>
      <div>
        <label for="poster">포스터 링크</label>
        <input type="url" name="name" required v-model="project.poster" />
      </div>
      <div>
        <label for="description">설명</label>
        <input
          type="text"
          name="description"
          required
          v-model="project.description"
        />
      </div>
      <div><button type="submit">업로드</button></div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'uploadproject',
  setup() {
    const response = ref('');
    const router = useRouter();
    const project = reactive({
      id: '',
      name: '',
      year: '',
      director: '',
      poster: '',
      description: '',
    });

    const onSubmit = async () => {
      try {
        await axios.post('http://localhost:3000/api/upload', project);
        console.log('upload success!');
      } catch (e) {
        console.log(e);
      }
      router.push({ name: 'projectlist' });
    };

    onMounted(async () => {
      try {
        let response = await axios.get('http://localhost:3000/api/projects');
        const projects = response.data;
        project.id = projects.length + 1;
      } catch (e) {
        console.log(e);
      }
    });

    return {
      response,
      project,
      onSubmit,
    };
  },
};
</script>

<style></style>
