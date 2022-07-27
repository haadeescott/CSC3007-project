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

  let partyColorDict = {
    PAP: "rgb(255, 99, 132)",
    WP: "rgb(54, 162, 235)",
    SDA: "rgb(255, 206, 86)",
    SDP: "rgb(75, 192, 192)",
    NSP: "rgb(153, 102, 255)",
    RP: "rgb(255, 159, 64)",
    SPP: "rgb(255, 0, 255)",
    PPP: "rgb(129, 193, 108)",
    PSP: "rgb(186, 155, 123)",
    PV: "rgb(112, 84, 39)",
    RDU: "rgb(204, 214, 93)",
    IndepentCandidate: "rgb(18, 77, 29)",
    "Nominated MP": "rgb(7, 100, 56)",
  };

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
      .style("fill", (d) => {
        console.log(
          `Name: ${d.name}, Party: ${d.party}, Color: ${
            partyColorDict[d.party]
          }`
        );
        return partyColorDict[d.party];
      });
    // (d.party === "-" ? "white" : party_clr(d.party)));

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
        $("#textPapSeatsGrowth").removeClass("sideTexts")
        $("#textOppSeatsGrowth").removeClass("sideTexts")
        $("#textSeatsInfo").removeClass("sideTexts")
        $("#textNumCandidates").removeClass("sideTexts")
        $("#textParliamentInfo").removeClass("sideTexts")
        $(".button-year").removeClass("focus");
        $(event.target).addClass("focus");
        $("#txtCenter").text(`${year}th Parliament`)
        updateParliament(data[0]);
        generateCharts(data[1], data[2]);
        updateChart(index);
      });
  });

  // Timer for buttons
  var intervalID = window.setInterval(myCallback, 3000);
  index = 0;
  function myCallback() {
    // remove animation
    $("#textPapSeatsGrowth").removeClass("sideTexts")
    $("#textOppSeatsGrowth").removeClass("sideTexts")
    $("#textSeatsInfo").removeClass("sideTexts")
    $("#textNumCandidates").removeClass("sideTexts")
    $("#textParliamentInfo").removeClass("sideTexts")

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
          borderColor: "rgba(255, 99, 132, 0.5)",
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
      title: {
        display: true,
        text: "Percentage of Parties elected in the Parliament",
        fontFamily: "Montserrat",
        fontColor: "white",
        fontSize: 18,
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
        fontSize: 18,
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
      fontColor: "white",
      fontSize: 18,
    },
    legend: {
      labels: PartiesContest,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.2)",
          },
          ticks: {
            fontFamily: "Montserrat",
            fontColor: "white",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.2)",
          },
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

  // GE and Parliament Info Dump
  var ParlText_11th =
    "The 11th Parliament of Singapore had its first session commenced on 2 November 2006 and was prorogued on 13 April 2009.\n \
  The second session commence from 18 May 2009 and was dissolved on 19 April 2011.\n \
  The membership was set by the 2006 Singapore General Election on 7 May 2006, and it has changed twice due to the deaths of Jurong GRC MP Dr Ong Chit Chung in 2008,\n \
  and Ang Mo Kio GRC MP Balaji Sadasivan who was also the Senior Minister of State for Foreign Affairs.";

  var ParlText_12th =
    "The 12th Parliament of Singapore commenced on 10 October 2011 and was prorogued on 25 August 2015.\n \
  The membership was set by the 2011 Singapore General Election on 7 May 2011 and changed three times due to\n \
  expulsion of Hougang Single Member Constituency MP in 2012 and resignation of Punggol East Single Member Constituency MP and\n \
  Speaker of Parliament over extra-marital affairs in 2013, as well as the death of Lee Kuan Yew, former Prime Minister of Singapore and MP of Tanjong Pagar Group Representation Constituency.";

  var ParlText_13th =
    "The 13th Parliament of Singapore first commenced on 15 January 2016 and was dissolved on 23 June 2020.\n \
  The membership was set by the 2015 Singapore General Election on 11 September 2015, and changed twice throughout the term;\n \
  one was the resignation of Bukit Batok Single Member Constituency MP David Ong in 2016, and the resignation of Marsiling–Yew Tee Group Representation Constituency MP and Speaker Halimah Yacob in 2017.";

  var ParlText_14th =
    "The 14th Parliament of Singapore is the current Parliament of Singapore. It opened on 24 August 2020. The membership was set by the 2020 Singapore General Election on 10 July 2020.\n \
  The 14th Parliament is controlled by the People's Action Party majority, led by Prime Minister Lee Hsien Loong and members of the cabinet, which assumed power on 25 July 2020.\n \
  The Opposition is led by Pritam Singh from the Workers' Party. Tan Chuan-Jin will be the Speaker of Parliament from the People's Action Party.";

  var GE_2006_Info =
    "Besides the ruling PAP, the other major political parties were the Workers' Party of Singapore (WP) led by Low Thia Khiang,\n \
  the Singapore Democratic Party (SDP) led by Chee Soon Juan, who himself was ineligible to run in this election because of a 2002 conviction\n \
  Four parties, including the SPP and the NSP, contested the election as members of the Singapore Democratic Alliance (SDA).";

  var GE_2011_Info =
    "Other political parties aside from PAP and WP are\n \
  the Singapore People's Party (SPP) led by Chiam See Tong which left the Singapore Democratic Alliance (SDA) in 2011,\n \
  the Singapore Democratic Party (SDP) led by Chee Soon Juan, the National Solidarity Party (NSP) led by Goh Meng Seng which left the SDA in 2007,\n \
  the Reform Party (RP) led by Kenneth Jeyaretnam, and the Singapore Democratic Alliance (SDA) led by Desmond Lim.";

  var GE_2015_Info =
    "The leading Opposition party is The Worker's Party, led by Low Thia Khiang, with 7 elected seats and 2 NCMP seats.\n \
  The Singapore People's Party led by Chiam See Tong has 1 NCMP seat. A total of eight Opposition parties challenged the ruling party in this election. \n \
  The Singaporean's First (SF SingFirst) led by Tan Jee Say, and the People's Power Party (PPP) led by Goh Meng Seng are the 2 new parties that have contested for the 2015 GE.";

  var GE_2020_Info =
    "A total of ten opposition parties challenged the ruling party in this election. The Progress Singapore Party (PSP) led by Tan Cheng Bock. The Peoples Voice (PV) led by Tean.\n \
  The Red Dot United (RDU) led by Ravi Philemon, and an Independent Candidate, are the 3 new parties that have emerged as contestants for the 2020 General Election.";

  var seats_11th =
    "Total Valid Votes: 1,123,273. PAP Votes: 748,130. Opposition Votes: 624,858.";

  var seats_12th =
    "Total Valid Votes: 2,015,636. PAP Votes: 1,212,154. Opposition Votes: 803,482.";

  var seats_13th =
    "Total Valid Votes: 2,260,379. PAP Votes: 1,579,183. Opposition Votes: 681,196.";

  var seats_14th =
    "Total Valid Votes: 2,494,537. PAP Votes: 1,527,491. Opposition Votes: 967,046.";
  //
  function getParlInfo(i) {
    textInfo = "";
    if (i == 0) {
      textInfo = ParlText_11th;
    } else if (i == 1) {
      textInfo = ParlText_12th;
    } else if (i == 2) {
      textInfo = ParlText_13th;
    } else {
      textInfo = ParlText_14th;
    }
    return textInfo;
  }

  function getGEInfo(i) {
    textInfo = "";
    if (i == 0) {
      textInfo = GE_2006_Info;
    } else if (i == 1) {
      textInfo = GE_2011_Info;
    } else if (i == 2) {
      textInfo = GE_2015_Info;
    } else {
      textInfo = GE_2020_Info;
    }
    return textInfo;
  }

  function getSeatsInfo(i) {
    textInfo = "";
    if (i == 0) {
      textInfo = seats_11th;
    } else if (i == 1) {
      textInfo = seats_12th;
    } else if (i == 2) {
      textInfo = seats_13th;
    } else {
      textInfo = seats_14th;
    }
    return textInfo;
  }

  function updateChart(i) {
    pieChart.data.datasets[0].data = Candidates_Won;
    pieChart.data.labels = Parties;
    pieChart.update();

    barChart.data.datasets[0].data = Candidates;
    barChart.data.labels = PartiesContest;
    barChart.update();

    var papPercent = `Percentage of PAP elected in Parliament: ${Math.floor(
      dataset1[i]
    )}%`;
    var oppPercent = `Percentage of Opposition elected in Parliament: ${Math.floor(
      dataset2[i]
    )}%`;

    $("#textPapSeatsGrowth").text(papPercent);
    $("#textOppSeatsGrowth").text(oppPercent);
    $("#textSeatsInfo").text(getSeatsInfo(i));
    $("#textNumCandidates").text(getGEInfo(i));
    $("#textParliamentInfo").text(getParlInfo(i));

    // add animation back
    $("#textPapSeatsGrowth").addClass("sideTexts")
    $("#textOppSeatsGrowth").addClass("sideTexts")
    $("#textSeatsInfo").addClass("sideTexts")
    $("#textNumCandidates").addClass("sideTexts")
    $("#textParliamentInfo").addClass("sideTexts")

  }

  // upon 1st page load
  updateChart(0);
});
