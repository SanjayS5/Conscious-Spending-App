<template>
  <div class="img-container">
    <p class="main-title">Spend Consciously</p>
    <img
      src="../../src/assets/landing_main.png"
      alt="main-image"
      style="max-width: 100%"
    />
    <router-link
      :to="{
        name: 'categorisePage',
      }"
      ><button class="btn">Get Started</button>
    </router-link>
  </div>

  <section class="mx-3">
    <div class="container mb-5">
      <div class="row">
        <div class="col-sm">
          <img
            class="img-fluid"
            alt="girl and chart"
            src="../assets/girl_chart.png"
          />
        </div>
        <div class="col-sm p-5">
          <h3 class="mb-5">Make a plan in three steps</h3>
          <ul>
            <li><p>Take a snapshot of your finances</p></li>
            <li><p>Understand your habits</p></li>
            <li><p>Automate your conscious spending plan</p></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <!-- spacer -->
      <p><br /></p>
    </div>

    <div class="mx-auto mb-5 col-8">
      <h2 class="text-center">How to use this app</h2>

      <!-- <p>
        Treat money like time. Think about how you spend your time. When you
        really enjoy something, would you spend more time or less time on it?
        It's the same when it comes to money. Why would you spend lots of money
        on things that don't bring you value.
      </p> -->
    </div>
    <div class="col-4 mx-auto mb-5">
      <p>Get your CSV file:</p>
      <ul>
        <li>
          <p>Head over to your online banking site</p>
        </li>
        <li>
          <p>Select your checking account</p>
        </li>
        <li>
          <p>Export your transactions as a CSV file</p>
        </li>
        <li>
          <p>Delete everything above the header line</p>
        </li>
        <li>
          <p>Upload your file when prompted</p>
        </li>
      </ul>
    </div>
    <div class="mb-5">
      <!-- spacer -->
      <p><br /></p>
    </div>
  </section>
  <section>
    <div class="mx-auto mb-5 col-6">
      <img
        src="../../src/assets/group_analyze.png"
        style="max-width: 100%"
        alt="group analysis"
      />
    </div>
    <div class="mx-auto col-6 mb-5">
      <h2>Use insights to analyze your habits</h2>
      <p>
        Analyze your spending to understand where your money is currently going
      </p>
      <p>Use this information as a way to plan your future spending</p>
    </div>
  </section>
  <div class="mb-5">
    <!-- spacer -->
    <p><br /></p>
  </div>
  <section>
    <h2 class="text-center">This is where you money should go</h2>
    <div class="mx-auto col-6">
      <img
        src="../../src/assets/where_your_money_goes.png"
        style="max-width: 100%"
        alt=""
      />
    </div>
  </section>
</template>


<style scoped>
p {
  font-size: 1.5rem;
}

.img-container {
  position: relative;
  width: 100%;
}

/* Make the image responsive */
.img-container img {
  width: 100%;
  height: auto;
}

/* Style the button and place it in the middle of the container/image */
.img-container .btn {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: rgb(172, 0, 83);
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.img-container .main-title {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: black;
  color: white;
  font-size: 68px;
  padding: 0px;
  margin: 0px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}
</style>