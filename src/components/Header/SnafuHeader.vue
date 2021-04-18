<template>
  <div>
    <div id="desktopHeader">
      <div id="pinnedLeftHeader">
        <div id="trasformedText">
          <a href="https://www.nftsnafu.org" target="_self" id="snafuText">SNAFU</a>
        </div>
        <img src="logo.png" alt="logo-SNAFU.png" id="logo">
      </div>

      <p id="subtitle"><a  href="https://www.nftsnafu.org">Artist Collective 2.0</a></p>

      <a id="backHome" href="https://www.nftsnafu.org">BACK TO HOME</a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
#pinnedLeftHeader {
  position: fixed;
  top: 110px;
  display: inline-table;
  z-index: 11111;
  left: -15px
}

#snafuText {
  text-decoration: unset;
  font-size: 52px;
  font-weight: bold;
  color: #303030;
  letter-spacing: 0.05em;
  line-height: 1.2em;
}

#pinnedLeftHeader > #logo {
  width: 65px;
  height: 65px;
  position: absolute;
  top: 125px;
  left: 60px;
  cursor: pointer;
  /*object-fit:cover;*/
  /*object-position:50% 50%*/
}

#trasformedText {
  transform: rotate(
      270deg
  );
}

#desktopHeader > #subtitle {
  position: absolute;
  top: 48px;
  left: 148px;
  font-weight: bold;
  letter-spacing: 0.23em;
  font-size: 17px;
}

#desktopHeader > #subtitle > a{
  text-decoration: unset;
  color: #303030;
}

#backHome {
  position: fixed;
  right: 100px;
  top: 50px;
  text-decoration: unset;
  color: #303030;
  font-size: 17px;
}

#backHome:hover {
  color: rgb(219, 219, 219);
}

</style>