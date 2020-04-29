<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <router-link to="/" class="navbar-brand" exact>
          <a>Quiz App</a>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <span class="navbar-text" style="cursor: default">Present player: {{ presentPlayer.name }} | Score: {{presentPlayer.score}}</span>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/" activeClass="active" router-tag="li" exact>
              <a class="nav-link">Home</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              to="/quiz-menu"
              activeClass="active"
              router-tag="li"
              exact
            >
              <a class="nav-link">Quiz</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/players" activeClass="active" router-tag="li">
              <a class="nav-link">Players</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/stats" activeClass="active" router-tag="li">
              <a class="nav-link">Stats</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              to="/question-creator"
              class="nav-item"
              activeClass="active"
              router-tag="li"
            >
              <a class="nav-link">Question Creator</a>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  computed: {
    presentPlayer() {
      return this.$store.getters.presentPlayer;
    },
  },
};
</script>
<style scoped></style>
