<template>
  <section class="container">
    <section>
      <div class="mb-3">
        <!-- spacer -->
        <p><br /></p>
      </div>
      <div class="mb-5">
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
        > Automated Finance Planner
      </div>
    </section>
    <section>
      <div class="mb-5">
        <h1>Automated Finance Planner</h1>
        <p>
          <br />
          Using the insights from your previous spending patterns, you can
          create a conscious spending plan.
        </p>
      </div>
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
                  <h6>
                    {{ category.description }}
                  </h6>
                  <div class="input-group mb-4">
                    <span class="input-group-text">{{ category.label }}</span>
                    <input
                      v-model.lazy="category.tempItemName"
                      type="text"
                      placeholder="Enter a name"
                      aria-label="Name"
                      class="form-control bg-dark text-white"
                    />
                    <input
                      v-model.number="category.tempItemAmount"
                      type="text"
                      aria-label="Amount"
                      placeholder="Eg. 1000"
                      class="form-control bg-dark text-white"
                      @keyup.enter="addItem(category)"
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
                      <li
                        :key="item.name"
                        v-for="item in category.subItems"
                        @click="undoAddItem(category, item)"
                      >
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
            <table class="table text-muted">
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
                <tr>
                  <td><b>Remaining Unallocated</b></td>
                  <td>
                    <b>
                      <span style="font-weight: 800">
                        {{ calculateRemainingAllocated }}
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
      <div>
        <div id="futurePlan"></div>
      </div>
    </section>
  </section>
</template>

<script>
import Plotly from "plotly.js-dist/plotly";
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
      this.updateTreeMap();
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
    updateTreeMap() {
      let values = [];
      for (let category in this.BudgetData) {
        if (category != "income") {
          values.push(this.BudgetData[category].percentage);
        } else {
          values.push(100);
        }
      }

      let labels = [];
      for (let category in this.BudgetData) {
        labels.push(this.BudgetData[category].label);
      }

      let parents = [];
      for (let category in this.BudgetData) {
        if (category == "income") {
          parents.push("");
        } else {
          parents.push("Income");
        }
      }

      var data = [
        {
          type: "treemap",
          values: values,
          labels: labels,
          parents: parents,
          // marker: { colorscale: "Blues" },
          branchvalues: "total",
          textinfo: "label+value+percent parent+percent",
        },
      ];

      var layout = {
        title: "Proportion of Your Income Allocated to Each Category",
        font: { size: 16 },
        paper_bgcolor: "black",
      };

      Plotly.newPlot("futurePlan", data, layout);
    },
    undoAddItem(categoryObj, item) {
      // this.BudgetData[this.category].subItems.pop();
      // this.updateCategoryTotal(this.BudgetData[this.category]);
      // this.updatePercentageOfIncome(this.BudgetData[this.category]);
      // this.updateTreeMap();

      const itemAsList = [item]; // ".includes" only works on lists
      let filteredArray = categoryObj.subItems.filter(
        (itemObj) => !itemAsList.includes(itemObj)
      );
      categoryObj.subItems = filteredArray;

      this.updateCategoryTotal(categoryObj);
      this.updatePercentageOfIncome(categoryObj);
      this.updateTreeMap();
    },
  },
  data() {
    return {
      BudgetData: {
        income: {
          label: "Income",
          subItems: [], // something like {itemName: "", amount: 0}
          total: 0,
          // percentage: 0,
          tempItemName: "",
          tempItemAmount: "",
        },
        fixedExpenses: {
          label: "Fixed Expenses",
          description: "Recommended < 40%",
          subItems: [],
          total: 0,
          percentage: 0,
        },
        electiveExpenses: {
          label: "Elective Expenses",
          description: "Recommended ~ 20%",
          subItems: [],
          total: 0,
          percentage: 0,
        },
        emergencyBuffer: {
          label: "Emergency Buffer",
          description: "Recommended ~ 10%",
          subItems: [],
          total: 0,
          percentage: 0,
        },
        investments: {
          label: "Investments",
          description: "Recommended ~ 10-20%",
          subItems: [],
          total: 0,
          percentage: 0,
        },
        guiltFreeMoney: {
          label: "Guilt Free Money",
          description: "Recommended ~ 10%",
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
    calculateRemainingAllocated() {
      return this.BudgetData.income.total - this.calculateTotalAllocated;
    },
  },
};
</script>


<style scoped>
.input-group-text {
  background-color: #711a37;
  color: #fff;
  border: none;
  width: 25%;
}

.nav-link.active {
  background-color: #4a2431;
  color: #fff;
}

td {
  height: 60px;
  vertical-align: middle;
}

p {
  font-size: 1.2rem;
}

.table > :not(caption) > * > * {
  border-bottom-width: 0px;
}
</style>