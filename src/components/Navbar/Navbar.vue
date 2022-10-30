<template>
  <nav class="navbar is-info">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="https://bulma.io/images/bulma-logo-white.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </router-link>
    </div>

    <div id="navMenuColorlink-example" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="/">
            Docs
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/">
              Overview
            </a>
            <a class="navbar-item" href="/">
              Modifiers
            </a>
            <a class="navbar-item" href="/">
              Columns
            </a>
            <a class="navbar-item" href="/">
              Layout
            </a>
            <a class="navbar-item" href="/">
              Form
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" href="/">
              Elements
            </a>
            <a class="navbar-item is-active" href="/">
              Components
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>