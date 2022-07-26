Promise.all([
  d3.json("11th_seating_plan.json"),
  d3.json("12th_seating_plan.json"),
  d3.json("13th_seating_plan.json"),
  d3.json("14th_seating_plan.json"),
  d3.json("GE.json"),
  d3.json("GE_details.json"),
]).then((data) => {
  let width = 1020,
    height = 500;

  // x axis for each row on chamber
  var row1_x = [];
  var row2_x = [];
  var row3_x = [];
  var row4_x = [];

  function setPosition_xRow(columns, row, input) {
    for (i = 0; i < columns; i++) {
      row[i] = input + 50 * i;
    }
  }

  // LAYOUT OF SINGAPORE PARLIAMENT => Total 112 seats available
  // 1ST ROW (18 COLUMNS) each seat is +50 apart
  setPosition_xRow(18, row1_x, width / 10 + 20);
  // 2ND ROW (16 COLUMNS)
  setPosition_xRow(16, row2_x, width / 10 + 70);
  // 3RD ROW (16 COLUMNS)
  setPosition_xRow(16, row3_x, width / 10 + 70);
  // 4TH ROW (6 COLUMNS)
  setPosition_xRow(6, row4_x, width / 10 + 270);

  var svg = d3
    .select("#seatChart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);
  // .style("background-color", "lightgrey");

  var aspect = width / height,
    chart = d3.select("#seatChart");
  d3.select(window).on("resize", function () {
    var targetWidth = chart.node().getBoundingClientRect().width;
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
  });

  let width_seat = 39,
    height_seat = 32;

  let party_clr = d3
    .scaleOrdinal()
    .domain([1, 5])
    .range([
      "blue",
      "green",
      "red",
      "orange",
      "yellow",
      "purple",
      "teal",
      "magenta",
      "cyan",
      "brown",
      "pink",
      "beige",
    ]);

  data_11 = data[0];
  data_12 = data[1];
  data_13 = data[2];
  data_14 = data[3];
  data_GE_06 = data[4].GE_2006;
  data_GE_11 = data[4].GE_2011;
  data_GE_15 = data[4].GE_2015;
  data_GE_20 = data[4].GE_2020;
  data_GE_details = data[5];
  var data_GE_06_details = data_GE_details.GE_2006;
  var data_GE_11_details = data_GE_details.GE_2011;
  var data_GE_15_details = data_GE_details.GE_2015;
  var data_GE_20_details = data_GE_details.GE_2020;

  updateParliament(data_11);

  function updateParliament(d) {
    let row1 = d.chamber_right.row_1;
    let row2 = d.chamber_right.row_2;
    let row3 = d.chamber_right.row_3;
    let row4 = d.chamber_right.row_4;
    let row5 = d.chamber_left.row_5;
    let row6 = d.chamber_left.row_6;
    let row7 = d.chamber_left.row_7;
    let row8 = d.chamber_left.row_8;

    // RIGHT CABINET (TOP SIDE)
    //  ===================================
    //1st Row Top side
    svg
      .append("g")
      .selectAll("#row_1")
      .data(d.chamber_right.row_1)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return row1_x[i];
      })
      .attr("y", 190)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("id", function (d, i) {
        return row1[i].name;
      })
      .attr("class", "row_1");

    //2nd Row Top side
    svg
      .selectAll("#row_2")
      .data(d.chamber_right.row_2)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return row2_x[i];
      })
      .attr("y", 150)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("id", function (d, i) {
        return row2[i].name;
      })
      .attr("class", "row_2");

    // 3rd Row Top side
    svg
      .selectAll("#row_3")
      .data(d.chamber_right.row_3)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return row3_x[i];
      })
      .attr("y", 110)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("id", function (d, i) {
        return row3[i].name;
      })
      .attr("class", "row_3");

    // 4th Row Top side
    svg
      .selectAll("#row_4")
      .data(d.chamber_right.row_4)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return row4_x[i];
      })
      .attr("y", 70)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("id", function (d, i) {
        return row4[i].name;
      })
      .attr("class", "row_3");

    //  ===================================

    // LEFT CABINET (BOTTOM SIDE)
    //  ===================================
    //1st Row Bottom side
    svg
      .append("g")
      .selectAll("#row_5")
      .data(d.chamber_left.row_5)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return row1_x[i];
      })
      .attr("y", 260)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("id", function (d, i) {
        return row5[i].name;
      })
      .attr("class", "row_5");

    //2nd Row Top side
    svg
      .selectAll("#row_6")
      .data(d.chamber_left.row_6)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return row2_x[i];
      })
      .attr("y", 300)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("id", function (d, i) {
        return row6[i].name;
      })
      .attr("class", "row_6");

    // 3rd Row Top side
    svg
      .selectAll("#row_7")
      .data(d.chamber_left.row_7)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return row3_x[i];
      })
      .attr("y", 340)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("id", function (d, i) {
        return row7[i].name;
      })
      .attr("class", "row_7");

    // 4th Row Top side
    svg
      .selectAll("#row_8")
      .data(d.chamber_left.row_8)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return row4_x[i];
      })
      .attr("y", 380)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("id", function (d, i) {
        return row8[i].name;
      })
      .attr("class", "row_8");

    //  ===================================

    svg
      .selectAll("rect")
      .attr("width", width_seat)
      .attr("height", height_seat)
      .style("fill", (d) => (d.party === "-" ? "white" : party_clr(d.party)));

    d3.select("#title")
      .append("h1")
      .append("text")
      .text(d.parliament)
      .attr("class", "text-center")
      .attr("class", "display-2");

    d3.selectAll("rect")

      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(30)
          .attr("stroke", "white")
          .attr("stroke-width", 4);
        d3.select(".tooltip2")
          .text("Party: " + d.party + ", " + "Name: " + d.name)
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px")
          .style("opacity", 0.9);
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(30)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .style("opacity", 1);
        d3.select(".tooltip2").style("opacity", 0);
      });
  } // end of updateParliament

  parliamentPeriod = [
    { year: 11, data: [data_11, data_GE_06, data_GE_06_details] },
    { year: 12, data: [data_12, data_GE_11, data_GE_11_details] },
    { year: 13, data: [data_13, data_GE_15, data_GE_15_details] },
    { year: 14, data: [data_14, data_GE_20, data_GE_20_details] },
  ];

  $.each(parliamentPeriod, function (index, value) {
    var year = value["year"];
    var data = value["data"];

    var className = index == 0 ? "button-year focus" : "button-year";

    d3.select("#button-area")
      .append("text")
      .attr("class", className)
      .attr("id", `btn${year}`)
      .text(`${year}th Parliament`)
      .on("click", (event, d) => {
        $(".button-year").removeClass("focus");
        $(event.target).addClass("focus");
        $("#txtCenter").text(`${year}th Parliament`);
        updateParliament(data[0]);
        generateCharts(data[1], data[2]);
        updateChart(index);
      });
  });

  // Timer for buttons
  var intervalID = window.setInterval(myCallback, 3000);
  index = 0;
  function myCallback() {
    var currParl = parliamentPeriod[index];
    var year = currParl["year"];
    var data = currParl["data"];
    $(".button-year").removeClass("focus");
    $(`#btn${year}`).addClass("focus");
    $("#txtCenter").text(`${year}th Parliament`);
    updateParliament(data[0]);
    generateCharts(data[1], data[2]);
    updateChart(index);
    if (index == 3) {
      clearInterval(intervalID);
    }
    index++;
  }

  // Charts
  // ==============================================

  function getWon(data) {
    j = 0;
    for (const i in data) {
      if (data[i].Won != 0) {
        Candidates_Won[j] = data[i].Won;
        j++;
      }
    }
  }

  function getParty(data) {
    j = 0;
    for (const i in data) {
      if (data[i].Won != 0) {
        Parties[j] = i;
        j++;
      }
    }
  }

  function getTotalSeats(data) {
    j = 0;
    for (const i in data) {
      TotalSeats[j] = data[i];
      j++;
    }
    TotalSeats.splice(1, 1);
  }

  function getCandidates(data) {
    j = 0;
    for (const i in data) {
      Candidates[j] = data[i].Candidates;
      j++;
    }
  }

  function getPartiesContest(data) {
    j = 0;
    for (const i in data) {
      PartiesContest[j] = i;
      j++;
    }
  }

  function generateCharts(d, d_details) {
    Candidates_Won = [];
    Parties = [];
    TotalSeats = [];
    Candidates = [];
    PartiesContest = [];

    getWon(d);
    getParty(d);
    getTotalSeats(d_details);
    getCandidates(d);
    getPartiesContest(d);

    Candidates_Won = Candidates_Won.concat(TotalSeats);
    Vacant_NMP = ["Vacant", "NMP"];
    Parties = Parties.concat(Vacant_NMP);
  }
  generateCharts(data_GE_06, data_GE_06_details);

  // Line chart
  function getPercentage(d, year) {
    var pap_power = (d.PAP.Won / year.Parliament_Seats) * 100;
    var opp_power = 100 - pap_power;
    return pap_power;
  }

  function getPercentage_opp(d, year) {
    var pap_power = (d.PAP.Won / year.Parliament_Seats) * 100;
    var opp_power = 100 - pap_power;
    return opp_power;
  }

  var dataset1 = [
    getPercentage(data_GE_06, data_GE_06_details),
    getPercentage(data_GE_11, data_GE_11_details),
    getPercentage(data_GE_15, data_GE_15_details),
    getPercentage(data_GE_20, data_GE_20_details),
  ];

  var dataset2 = [
    getPercentage_opp(data_GE_06, data_GE_06_details),
    getPercentage_opp(data_GE_11, data_GE_11_details),
    getPercentage_opp(data_GE_15, data_GE_15_details),
    getPercentage_opp(data_GE_20, data_GE_20_details),
  ];

  var xLabel = [
    "11th Parliament",
    "12th Parliament",
    "13th Parliament",
    "14th Parliament",
  ];
  new Chart("lineChart", {
    type: "line",
    data: {
      labels: xLabel,
      datasets: [
        {
          label: "PAP",
          data: dataset1,
          borderColor: "red",
          fill: false,
        },
        {
          label: "Opposition Parties",
          data: dataset2,
          borderColor: "blue",
          fill: false,
        },
      ],
    },
    options: {
      legend: {
        display: true,
        labels: {
          fontFamily: "Montserrat",
          fontColor: "white",
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontFamily: "Montserrat",
              fontColor: "white",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontFamily: "Montserrat",
              fontColor: "white",
            },
          },
        ],
      },
    },
  });
  // end of line chart

  // pie chart
  var barColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 0, 255, 0.2)",
    "rgba(129, 193, 108, 0.2)",
    "rgba(186, 155, 123, 0.2)",
    "rgba(112, 84, 39, 0.2)",
    "rgba(204, 214, 93, 0.2)",
    "rgba(18, 77, 29, 0.2)",
  ];

  var barBorderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 0, 255, 1)",
    "rgba(129, 193, 108, 1)",
    "rgba(186, 155, 123, 1)",
    "rgba(112, 84, 39, 1)",
    "rgba(204, 214, 93, 1)",
    "rgba(18, 77, 29, 1)",
  ];

  var pieChart = new Chart("pieChart", {
    type: "pie",
    data: {
      labels: Parties,
      datasets: [
        {
          backgroundColor: barColors,
          borderColor: barBorderColors,
          borderWidth: 1,
          data: Candidates_Won,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Parties in the Parliament",
        fontFamily: "Montserrat",
        fontColor: "white",
      },
      legend: {
        labels: {
          fontFamily: "Montserrat",
          fontColor: "white",
        },
      },
    },
  });
  // end of pie chart

  var barChartOptions = {
    title: {
      display: true,
      text: "Total number of candidates contested for each General Election (GE)",
      fontFamily: "Montserrat",
      fontColor: "rgb(255, 255, 255, 0.7)",
    },
    legend: {
      labels: PartiesContest,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontFamily: "Montserrat",
            fontColor: "white",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontFamily: "Montserrat",
            fontColor: "white",
          },
        },
      ],
    },
  };
  // bar chart
  var barChart = new Chart("barChart", {
    type: "bar",
    data: {
      labels: PartiesContest,
      datasets: [
        {
          backgroundColor: barColors,
          borderColor: barBorderColors,
          borderWidth: 1,
          data: Candidates,
        },
      ],
    },
    options: barChartOptions,
  });
  // end of bar chart

  function updateChart(i) {
    pieChart.data.datasets[0].data = Candidates_Won;
    pieChart.data.labels = Parties;
    pieChart.update();

    barChart.data.datasets[0].data = Candidates;
    barChart.data.labels = PartiesContest;
    barChart.update();

    var papPercent = `Percentage of PAP: ${Math.floor(dataset1[i])}%`;
    var oppPercent = `Percentage of Opposition: ${Math.floor(dataset2[i])}%`;

    var ParliamentInfoText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'

    $("#textNumCandidates").text("put text here");
    $("#textPapSeatsGrowth").text(papPercent);
    $("#textOppSeatsGrowth").text(oppPercent);
    $("#textParliamentInfo").text(ParliamentInfoText)
  }

  // upon 1st page load
  updateChart(0);
});
