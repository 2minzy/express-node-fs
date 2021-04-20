<template>
  <div>
    <form method="post" @submit.stop.prevent="onSubmit">
      <div>
        <label for="name">브랜드 이름</label>
        <input type="text" name="name" required v-model="project.brandName" />
      </div>
        <div>
        <label for="name">프로젝트 종류</label>
        <input type="text" name="name" required v-model="project.projectType" />
      </div>
      <!-- <div>
        <label for="year">개봉 년도</label>
        <input type="number" name="year" v-model="project.year" />
      </div>
      <div>
        <label for="director">감독</label>
        <input
          type="text"
          name="director"
        
          v-model="project.director"
        />
      </div> 
      <div>
        <label for="poster">포스터 링크</label>
        <input type="url" name="name"  v-model="project.poster" />
      </div>
      <div>
        <label for="description">설명</label>
        <input
          type="text"
          name="description"
          
          v-model="project.description"
        />
      </div> -->
      <div>
        <label for="photo">이미지</label>
        <input type="file" name="photo" @change="onFileSelected" />
      </div>
      <div>
        <label for="photo">로고이미지</label>
        <input type="file" name="photo" @change="onFileSelected" />
      </div>
      <div><button type="submit">업로드</button></div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'UploadProject',
  setup() {
    const router = useRouter(); 
    const project = reactive({
      type: 'kv',
      brandName: '', 
      projectType: '',     
      projectTumbnail: null,
      projectLogo: null,
    });
    const data = ref({})

    const onFileSelected = (e) => {
      project.projectTumbnail = e.target.files[0];
      project.projectLogo = e.target.files[0]
      // this.fileName = event.target.files[0].name;
    }

    const onSubmit = async () => {
      try {
        let data = new Object;
        data.global = project;

        // data.modules = new Array;
       
        // let formData = new FormData();
        // data.append("projectThumbnail", project.projectTumbnail)
        // data.append("projectLogo", project.projectLogo)
        // modules.push(formData)

        await axios.post('http://localhost:3000/api/upload', data);
        alert('업로드 성공!');
      } catch (e) {
        console.log(e);
      }
      router.push({ name: 'projectlist' });
    };

    return {
      project,
      data,
      onFileSelected,
      onSubmit
    }
  },
};
</script>

<style></style>
