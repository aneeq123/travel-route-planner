var countries = {
  Ireland: {
    capital: "Dublin",
    flag: "🇮🇪",
    cities: ["Dublin", "Cork", "Galway", "Limerick", "Waterford"]
  },
  England: {
    capital: "London",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    cities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"]
  },
  Spain: {
    capital: "Madrid",
    flag: "🇪🇸",
    cities: ["Madrid", "Barcelona", "Seville", "Valencia", "Bilbao"]
  },
  France: {
    capital: "Paris",
    flag: "🇫🇷",
    cities: ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice"]
  },
  Germany: {
    capital: "Berlin",
    flag: "🇩🇪",
    cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"]
  }
};

// Populate country dropdowns and reference table on page load
function loadCountries() {
  var fromSelect = document.getElementById("fromCountry");
  var toSelect = document.getElementById("toCountry");
  var tbody = document.getElementById("countryTable");

  for (var name in countries) {
    var country = countries[name];

    var opt1 = document.createElement("option");
    opt1.value = name;
    opt1.text = country.flag + " " + name;
    fromSelect.appendChild(opt1);

    var opt2 = document.createElement("option");
    opt2.value = name;
    opt2.text = country.flag + " " + name;
    toSelect.appendChild(opt2);

    // Build reference table row
    var cityLabels = "";
    for (var i = 0; i < country.cities.length; i++) {
      var city = country.cities[i];
      if (city === country.capital) {
        cityLabels += '<span class="capital-badge me-1">' + city + '</span>';
      } else {
        cityLabels += '<span class="me-1">' + city + '</span>';
      }
    }

    var tr = document.createElement("tr");
    tr.innerHTML = '<td><strong>' + country.flag + ' ' + name + '</strong></td><td>' + cityLabels + '</td>';
    tbody.appendChild(tr);
  }
}

// Load cities for a direction (from/to)
function loadCities(direction) {
  var countrySelect = document.getElementById(direction + "Country");
  var citySelect = document.getElementById(direction + "City");
  var selectedCountry = countrySelect.value;

  citySelect.innerHTML = '<option value="">-- Select City --</option>';

  if (!selectedCountry) return;

  var cityList = countries[selectedCountry].cities;
  var capital = countries[selectedCountry].capital;

  for (var i = 0; i < cityList.length; i++) {
    var opt = document.createElement("option");
    opt.value = cityList[i];
    opt.text = cityList[i] === capital ? cityList[i] + " (Capital)" : cityList[i];
    citySelect.appendChild(opt);
  }
}

// Build route steps based on rules
function buildRoute(fromCountry, fromCity, toCountry, toCity) {
  var steps = [];
  var fromCapital = countries[fromCountry].capital;
  var toCapital = countries[toCountry].capital;

  // Rule 1: Same country — Bus only
  if (fromCountry === toCountry) {
    if (fromCity === toCity) return null;
    steps.push({ from: fromCity, to: toCity, mode: "Bus", note: "Same country — Bus" });
    return steps;
  }

  // Rule 2: Different countries
  // Step A: If not at capital, take Bus to home capital first
  if (fromCity !== fromCapital) {
    steps.push({ from: fromCity, to: fromCapital, mode: "Bus", note: "Bus to home capital" });
  }

  // Step B: Fly capital to capital
  steps.push({ from: fromCapital, to: toCapital, mode: "Plane", note: "International flight between capitals" });

  // Step C: If destination is not the capital, take Bus to final city
  if (toCity !== toCapital) {
    steps.push({ from: toCapital, to: toCity, mode: "Bus", note: "Bus from destination capital to final city" });
  }

  return steps;
}

// Render result on screen
function planRoute() {
  var fromCountry = document.getElementById("fromCountry").value;
  var fromCity = document.getElementById("fromCity").value;
  var toCountry = document.getElementById("toCountry").value;
  var toCity = document.getElementById("toCity").value;
  var resultDiv = document.getElementById("result");

  if (!fromCountry || !fromCity || !toCountry || !toCity) {
    resultDiv.innerHTML = '<div class="alert alert-warning"><i class="bi bi-exclamation-triangle-fill me-2"></i>Please select all fields before planning.</div>';
    return;
  }

  if (fromCountry === toCountry && fromCity === toCity) {
    resultDiv.innerHTML = '<div class="alert alert-danger"><i class="bi bi-x-circle-fill me-2"></i>Origin and destination are the same city.</div>';
    return;
  }

  var steps = buildRoute(fromCountry, fromCity, toCountry, toCity);

  if (!steps || steps.length === 0) {
    resultDiv.innerHTML = '<div class="alert alert-danger">Could not build a route. Please try again.</div>';
    return;
  }

  var fromFlag = countries[fromCountry].flag;
  var toFlag = countries[toCountry].flag;

  var html = '<div class="route-card">';
  html += '<div class="route-header">';
  html += fromFlag + ' ' + fromCity + ' <span class="text-muted">(' + fromCountry + ')</span>';
  html += ' &nbsp;<i class="bi bi-arrow-right text-primary"></i>&nbsp; ';
  html += toFlag + ' ' + toCity + ' <span class="text-muted">(' + toCountry + ')</span>';
  html += '</div>';

  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    var icon = step.mode === "Plane" ? "✈️" : "🚌";
    var badgeClass = step.mode === "Plane" ? "bg-primary" : "bg-success";

    if (i > 0) {
      html += '<div class="connector"></div>';
    }

    html += '<div class="step-row">';
    html += '<div class="step-number">' + (i + 1) + '</div>';
    html += '<div class="step-icon">' + icon + '</div>';
    html += '<div class="step-details">';
    html += '<div class="step-cities">' + step.from + ' &rarr; ' + step.to;
    html += ' <span class="badge ' + badgeClass + ' ms-1" style="font-size:0.75rem;">' + step.mode + '</span></div>';
    html += '<div class="step-note">' + step.note + '</div>';
    html += '</div>';
    html += '</div>';
  }

  html += '<div class="mt-3 pt-2 border-top text-muted" style="font-size:0.8rem;">';
  html += '<i class="bi bi-check-circle-fill text-success me-1"></i>';
  html += steps.length + ' leg' + (steps.length > 1 ? 's' : '') + ' in this journey.';
  html += '</div>';
  html += '</div>';

  resultDiv.innerHTML = html;
}

// Init
loadCountries();
