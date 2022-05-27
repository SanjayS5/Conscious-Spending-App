<template>
  <section class="container">
    <section>
      <div class="mb-3">
        <router-link
          :to="{
            name: 'Home',
          }"
          >Home Page
        </router-link>
        >
        <router-link
          :to="{
            name: 'categorisePage',
          }"
          >Categorise Transactions
        </router-link>
        >
        <router-link
          :to="{
            name: 'Insights',
          }"
        >
          Insights
        </router-link>
        > Budget
      </div>
    </section>
    <section>
      <div class="mb-3"><h1>Budget</h1></div>
      <!-- The container for input and table begins here -->
      <div class="row">
        <div class="col-6">
          <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Totals
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Expenses
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div class="mb-5"></div>
                <!-- Spacer -->
                <div :key="category.label" v-for="category in BudgetData">
                  <div class="input-group mb-4">
                    <span class="input-group-text">{{ category.label }}</span>
                    <input
                      type="text"
                      placeholder="Example: Rent"
                      aria-label="Name"
                      class="form-control"
                    />
                    <input
                      type="text"
                      aria-label="Amount"
                      placeholder="Example: 1000"
                      class="form-control"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                ...
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <!-- TABLE COLUMN GOES HERE -->

          <div>
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>Category</th>
                  <th>Total</th>
                  <th>Percentage of Income</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="category.label" v-for="category in BudgetData">
                  <!-- <TxRow :tx="tx" /> -->
                  <div class="mb-4">
                    <td>{{ category.label }}</td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- TABLE COLUMN ENDS HERE-->
        </div>
      </div>
      <!-- The container for input and table ends here -->
    </section>
  </section>
</template>

<script>
export default {
  name: "BudgetView",
  props: {
    categoryName: String,
    category: String,
    tx: Array,
    query: Object,
  },
  methods: {},
  data() {
    return {
      BudgetData: {
        income: { label: "Income", amount: 0, total: 0, percentage: 0 },
        fixedExpenses: {
          label: "Fixed Expenses",
          subItems: [], // {itemName: "", amount: 0}
          total: 0,
          percentage: 0,
        },
        electiveExpenses: {
          label: "Elective Expenses",
          subItems: [],
          total: 0,
          percentage: 0,
        },
        emergencyBuffer: {
          label: "Emergency Buffer",
          subItems: [],
          total: 0,
          percentage: 0,
        },
        investments: {
          label: "Investments",
          subItems: [],
          total: 0,
          percentage: 0,
        },
        guiltFreeMoney: {
          label: "Guilt Free Money",
          subItems: [],
          total: 0,
          percentage: 0,
        },
      },
    };
  },
};
</script>