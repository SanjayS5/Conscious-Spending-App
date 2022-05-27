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
                      v-model.lazy="category.tempItemName"
                      type="text"
                      placeholder="Enter a name"
                      aria-label="Name"
                      class="form-control"
                    />
                    <input
                      v-model.number="category.tempItemAmount"
                      type="text"
                      aria-label="Amount"
                      placeholder="Eg. 1000"
                      class="form-control"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      @click="addItem(category)"
                    >
                      Add
                    </button>
                  </div>
                  <div class="mb-2">
                    <ul>
                      <li :key="item.name" v-for="item in category.subItems">
                        {{ item.name }}: {{ item.amount }}
                      </li>
                    </ul>
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
                  <td>{{ category.label }}</td>
                  <td>{{ category.total }}</td>
                  <td>{{ category.percentage }}</td>
                </tr>
                <tr>
                  <td><b>Total Allocated</b></td>
                  <td>
                    <b>
                      <span style="border-bottom: double black">
                        {{ calculateTotalAllocated }}
                      </span>
                    </b>
                  </td>
                  <td>{{ calculatePercentageOfIncome }}</td>
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
  methods: {
    addItem(categoryObj) {
      categoryObj.subItems.push({
        name: categoryObj.tempItemName,
        amount: categoryObj.tempItemAmount,
      });
      this.updateCategoryTotal(categoryObj);
      this.updatePercentageOfIncome(categoryObj);
    },
    updateCategoryTotal(categoryObj) {
      categoryObj.total = 0; // removes the need to subtract when item is removed
      categoryObj.subItems.forEach((item) => {
        categoryObj.total += item.amount;
      });
    },
    updatePercentageOfIncome(categoryObj) {
      // categoryObj.percentage = (categoryObj.total / this.income.total) * 100;
      if (categoryObj.label != "Income") {
        categoryObj.percentage =
          (categoryObj.total / this.BudgetData.income.total) * 100;
      }
    },
  },
  data() {
    return {
      BudgetData: {
        income: {
          label: "Income",
          subItems: [], // {itemName: "", amount: 0}
          total: 0,
          // percentage: 0,
          tempItemName: "",
          tempItemAmount: "",
        },
        fixedExpenses: {
          label: "Fixed Expenses",
          subItems: [],
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
  computed: {
    // return sum of totals for all categories
    calculateTotalAllocated() {
      let sumOfTotals = 0;
      for (let category in this.BudgetData) {
        if (category != "income") {
          sumOfTotals += this.BudgetData[category].total;
        }
      }
      return sumOfTotals;
    },
    // caculate the percentage of income for all categories
    calculatePercentageOfIncome() {
      let percentage = 0;
      for (let category in this.BudgetData) {
        if (category != "income") {
          percentage +=
            (this.BudgetData[category].total / this.BudgetData.income.total) *
            100;
        }
      }
      return percentage ? percentage : 0;
    },
  },
};
</script>