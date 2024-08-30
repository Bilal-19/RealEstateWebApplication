import { preventBrowserRefresh, formInputValidation } from "./utilities.mjs"
import { plotData, propertyConsultant} from "./data.mjs";


const showPlotEl = document.getElementById("show-plot")
const showPropConsultantEl = document.getElementById("show-property-consultant")

// Attach an event listener to prevent page refresh
document.querySelector("form").addEventListener("submit", (e) => {
  console.log('Form is clicked')
  preventBrowserRefresh(e)

})

// Display all categories of plot
plotData.map(val => {
  showPlotEl.innerHTML +=
    `
  <div class="col-md-4">
    <div class="card my-2 shadow">
      <img src="${val.imageSrc}" class="card-img-top"/>
      <div class="card-body">
        <h4 class="card-title"><i class="fa-solid fa-location-dot"></i> ${val.plotLocation}</h4>
        <p class="card-text mt-0 mb-0"><i class="fa-solid fa-money-check-dollar"></i> ${val.plotPrice} PKR</p>
        <div class="d-flex justify-content-start">
          <p class="card-text mt-0 mb-0"><i class="fa-solid fa-bed"></i> ${val.noOfBedroom}</p>
          <p class="card-text mt-0 mb-0 mx-5"><i class="fa-solid fa-bath"></i> ${val.noOfWashroom}</p>
        </div>
        <p class="card-text mt-0 mb-0"><i class="fa-solid fa-envelope"></i> ${val.ownerEmail}</p>
      </div>
    </div>
  </div>
  `
})

// Display property consultant information
propertyConsultant.map((item) => {
  showPropConsultantEl.innerHTML += 
  `
  <div class="col-md-4">
    <div class="card my-2 shadow">
      <div class="card-body">
      <h5 class="card-title">${item.consultantName}</h5>
        <p class="card-title"><i class="fa-solid fa-location-dot"></i> ${item.consultantLocation}</p>
        <div class="d-flex justify-content-start">
          <p class="card-text mt-0 mb-0"><i class="fa-solid fa-business-time"></i> ${item.officeTime}</p>
          <p class="card-text mt-0 mb-0 mx-5"><i class="fa-solid fa-square-check"></i>Experience: ${item.yearsOfExperience} years</p>
        </div>
      </div>
    </div>
  </div>
  `
})



// Area Unit Converter
const selectAreaUnitEl = document.getElementById("area-converter")
const getValue = document.getElementById("cal-marla-size")
const areaResult = document.getElementById("area-result")
const calcAreaBtn = document.getElementById("calc-area")

calcAreaBtn.addEventListener("click", (e) => {
  e.preventDefault()
  switch (selectAreaUnitEl.value) {
    case "square-feet":
      areaResult.textContent = `${Number(getValue.value)} Marla = ${Number(getValue.value) * 225} Sq. ft.`
      break
    case "square-yards":
      areaResult.textContent = `${Number(getValue.value)} Marla = ${Number(getValue.value) * 25} Sq. yd.`
      break
    case "square-meters":
      areaResult.textContent = `${Number(getValue.value)} Marla = ${Number(getValue.value) * 21} Sq. m.`
      break
    case "kanal":
      areaResult.textContent = `${Number(getValue.value)} Marla = ${Number(getValue.value) * 0.05} Kanal`
      break
    case "acre-kanal":
      areaResult.textContent = `${Number(getValue.value)} Marla = ${Number(getValue.value) * 0.01} Acre / Kanal`
      break
    case "murabba":
      areaResult.textContent = `${Number(getValue.value)} Marla = ${Number(getValue.value) * 0} Murabba`
      break
    case "hectare":
      areaResult.textContent = `${Number(getValue.value)} Marla = ${Number(getValue.value) * 0} Hectare`
      break
    default:
      areaResult.textContent = Number(getValue.value)
  }
})

// Home Loan Calculator
const propPriceEl = document.getElementById("cal-property-price")
const downPaymentEl = document.getElementById("cal-down-payment")
const loanPeriodEl = document.getElementById("cal-loan-period")
const annualInterestRateEl = document.getElementById("cal-AIR")
const calcEMIBtn = document.getElementById("calc-emi")
const emiResult = document.getElementById("emi-result")

const calculateEMI = () => {
  formInputValidation(propPriceEl, "show-price-error", "Valid property price value", "Please input property price value")
  formInputValidation(downPaymentEl, "show-payment-error", "Valid down payment value", "Please input payment value")
  formInputValidation(loanPeriodEl, "show-loan-error", "Valid loan period value", "Please input loan period in percentage")
  formInputValidation(annualInterestRateEl, "show-air-error", "Valid annual interest rate value", "Please input annual interest rate in percentage")

  const loanAmount = Number(propPriceEl.value) - Number(downPaymentEl.value)
  const monthlyInterestRate = Number(annualInterestRateEl.value) / 100 / 12;
  const noOfMonthlyInstallment = Number(loanPeriodEl.value) * 12;

  const numerator =
    loanAmount *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, noOfMonthlyInstallment);
  const denominator =
    Math.pow(1 + monthlyInterestRate, noOfMonthlyInstallment) - 1;

  const EMI = (numerator / denominator).toFixed(2)

  if (EMI >= 0) {
    emiResult.textContent = `You have to pay ${EMI} PKR on monthly basis`
  } else {
    emiResult.textContent = 'Please provide correct value to calculate EMI'
  }
}


calcEMIBtn.addEventListener("click", (e) => {
  e.preventDefault()
  calculateEMI()
})



// Construction Cost Calculator
const calConstructionCostBtn = document.getElementById("calc-construction-cost")
const perSqFeetCostEl = document.getElementById("per-sqfeet-cost")
const areaSqFeetCostEl = document.getElementById("area-sqfeet")
const additionalCostEl = document.getElementById("additional-cost")
const constructionCostResult = document.getElementById("construction-cost-result")

calConstructionCostBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const result = constructionCostCalculator(
    Number(perSqFeetCostEl.value),
    Number(areaSqFeetCostEl.value),
    Number(additionalCostEl.value)
  )
  if (result > 0){
    constructionCostResult.textContent = `Estimated Cost: ${result} PKR`
  } else {
    constructionCostResult.textContent = `Please provide correct values`
  }
})


const constructionCostCalculator = (perSqFeetCostValue, areaSqFeetValue, additionalCostValue) => {
  console.log(perSqFeetCostValue, areaSqFeetValue, additionalCostValue)
  formInputValidation(perSqFeetCostEl, "per-sqfeet-cost-err", "Valid Per Square Feet Cost Value", "Invalid Per Square Feet Cost Value")
  formInputValidation(areaSqFeetCostEl, "area-sqfeet-error", "Valid Area Square Feet Value", "Invalid Area Square Feet Value")
  formInputValidation(additionalCostEl, "additional-cost-error", "Valid Additional Cost Value", "Invalid Additional Cost Value")
  let totalCost;
  if (perSqFeetCostValue > 0 && areaSqFeetValue > 0 && additionalCostValue > 0) {
      totalCost = (perSqFeetCostValue * areaSqFeetValue) + additionalCostValue
      return totalCost
  } else {
    totalCost = 0
  }
}

// Social Icons
const socialIcons = [
  "fa-brands fa-facebook", "fa-brands fa-instagram","fa-solid fa-envelope","fa-brands fa-youtube"
]

const socialIconEl = document.getElementById("social-icons")

socialIcons.map(val => {
  socialIconEl.innerHTML += `<a href="#" class="text-light"><i class="${val}"></i></a>`
})

// Contact US form
const contactFormEl = document.getElementById("contact-form")

contactFormEl.addEventListener("submit", preventBrowserRefresh)


// footer navigation
const footerNavOptEl = document.getElementById("footer-nav-options")
const footerNavigationOptions = [
  {
    id: 1,
    linkTo: "commercial-residential-plots",
    displayText: "Commercial & Residential Plots"
  },
  {
    id: 2,
    linkTo: "property-consultant",
    displayText: "Property Consultant"
  },
  {
    id: 3,
    linkTo: "home-loan-calculator",
    displayText: "Home Loan Calculator"
  },
  {
    id: 4,
    linkTo: "area-unit-calculator",
    displayText: "Area Unit Converter"
  },
  {
    id: 5,
    linkTo: "construction-cost-calculator",
    displayText: "Construction Cost Calculator"
  }
]

footerNavigationOptions.map((item) => {
  footerNavOptEl.innerHTML += 
  `
  <a href="#${item.linkTo}" class="text-light text-decoration-none d-block">
    ${item.displayText}
  </a>`
})