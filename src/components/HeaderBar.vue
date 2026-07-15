<template>
  <header class="header">
    <div class="left">
      <h1>IPI Lab Portal</h1>
      <span class="mode">Check-In • Central Lab — Receiving</span>
    </div>
    <div class="right">
      <span class="user">Lab Tech 1</span>
      <div class="avatar">LT</div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b;
  color: white;
  padding: 1rem 2rem;
}
.mode {
  font-size: 0.9rem;
  opacity: 0.8;
}
.avatar {
  background-color: #2563eb;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
