<template>
  <header>
    <div class="container">
      <h3 class="m-3">Reviews Sentiment Analysis</h3>
      <button class="btn btn-danger m-3" @click="previousClickReview" :disabled="current_index == 0">Previous</button>
      <button class="btn btn-primary m-3" @click="nextClickReview">Next</button>
      <div class="card m-4">
        <div class="card-body">
          <div class="alert alert-danger" role="alert" v-if="current_review.filter">
            Has been chosen to be filtered
          </div>
          <small class="card-subtitle">{{ current_review.coffee_shop_name }}</small>
          <h2 class="card-title">{{ current_review.title }}</h2>
          <p>{{ current_review.text }}</p>

          <ul class="list-group">
            <ul class="list-group" v-if="current_review.keywords">
              <li class="list-group-item active">Important Keywords</li>
              <li class="list-group-item" v-for="keyword in current_review.keywords">{{ keyword }}</li>
            </ul>
          </ul>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import reviews from '../../reviews.json';
import { ref } from 'vue'

export default {
  setup() {
    const reviews_ref = ref(reviews);
    const current_index = ref(0);
    const current_review = ref(reviews[current_index.value]);

    console.log(reviews)

    function nextClickReview() {
      current_index.value++;
      current_review.value = reviews[current_index.value]
    }

    function previousClickReview() {
      current_index.value--;
      current_review.value = reviews[current_index.value]
    }

    return {
      current_review,
      current_index,
      nextClickReview,
      previousClickReview
    }
  },
  nextReview() {
    console.log("function called");
    this.current_index++;
    this.current_review = reviews[this.current_index];
  }
}
</script>

<style scoped>

</style>
