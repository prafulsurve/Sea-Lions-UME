  var data = {
    'year2008': {
      'food' : {
        'north' : [1, 0.9, 0.9, 1.3],
        'south' : [1, 1.2, 2.3, 0.8]
      },
      'oceanHeat' : {
        'north' : 5.927515367,
        'south' : 9.815766667
      },
      'seaLevel' : {
        'north' : 0.026,
        'south' : 0.03
      },
      'co2' : {
        'north' : 280,
        'south' : 260
      },
      'weight' : {
        'north' : [18, 21],
        'south' : [18, 21]
      },
      'population' : {
        'north' : 54300,
        'south' : 54300
      },
      'stranding' : {
        'north' : 109,
        'south' : 109
      }
    },
    'year2010': {
      'food' : {
        'north' : [0.1, 0.3, 1.5, 2],
        'south' : [0.2, 0.3, 2.1, 1.3]
      },
      'oceanHeat' : {
        'north' : 5.929535367,
        'south' : 10.13076667
      },
      'seaLevel' : {
        'north' : 0.03,
        'south' : 0.034
      },
      'co2' : {
        'north' : 300,
        'south' : 310
      },
      'weight' : {
        'north' : [17.5, 20],
        'south' : [17.5, 20]
      },
      'population' : {
        'north' : 40000,
        'south' : 35000
      },
      'stranding' : {
        'north' : 399,
        'south' : 399
      }
    },
    'year2013': {
      'food' : {
        'north' : [0.09,	0.2, 4,	3.5],
        'south' : [0.2, 0.1, 2.8, 3.8]
      },
      'oceanHeat' : {
        'north' : 6.771455367,
        'south' : 12.36476667
      },
      'seaLevel' : {
        'north' : 0.036,
        'south' : 0.04
      },
      'co2' : {
        'north' : 365,
        'south' : 350
      },
      'weight' : {
        'north' : [13, 14.5],
        'south' : [13, 14.5]
      },
      'population' : {
        'north' : 35500,
        'south' : 32500
      },
      'stranding' : {
        'north' : 1171,
        'south' : 1171
      }
    },
    'year2016': {
      'food' : {
        'north' : [0.03, 0.1, 2, 1.5],
        'south' : [0.1, 0.08, 1.8, 2.8]
      },
      'oceanHeat' : {
        'north' : 7.696565367,
        'south' : 14.88576667
      },
      'seaLevel' : {
        'north' : 0.042,
        'south' : 0.047
      },
      'co2' : {
        'north' : 402,
        'south' : 395
      },
      'weight' : {
        'north' : [13, 17],
        'south' : [13, 17]
      },
      'population' : {
        'north' : 30000,
        'south' : 30000
      },
      'stranding' : {
        'north' : 1654,
        'south' : 1654
      }
    }
  };

  var changed_data = JSON.parse(JSON.stringify(data));

  var width = 1100;
  var height = 526;

  var slider_food_s_val;
  var slider_food_n_val;
  var foodColors = ['#C9CACA', '#B5B5B6', '#898989', '#727171', '#727171', '#898989', '#B5B5B6', '#C9CACA'];
  var oceanHeatColors = '#2D629F';
  var seaLevelColors = '#6094BA';
  var co2Colors = '#96B4BE';
  var weightColors = ['#C73433', '#531211', '#C73433', '#531211'];
  var populationColors = '#C85F51';
  var strandingColors = '#CF9694'
  var textColor = 'white';
  var textFontSize = '10px'

  var canvas = d3.select('.svg')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

  var group1 = canvas.append('g')
  .attr("transform", "translate(" + width / 4 + "," + height * .52 + ")")
  .attr('class', 'group1');

  var group2 = canvas.append('g')
  .attr("transform", "translate(" + (width - (width / 4)) + "," + height * .52 + ")")
  .attr('class', 'group2');


  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


  var p = Math.PI;
  var YEAR;

  var foodMin = 0;
  var foodMax = 4;
  var oceanHeatMin = 0;
  var oceanHeatMax = 15;
  var seaLevelMin = 0.000;
  var seaLevelMax = 0.050;
  var co2Min = 250;
  var co2Max = 450;

  var weightMin = 10;
  var weightMax = 25;
  var populationMin = 25000;
  var populationMax = 60000;
  var strandingMin = 100;
  var strandingMax = 1700;

  var food_factor = d3.scaleLinear()
  .domain([foodMin, foodMax])
  .range([0, 1]); //Directly Proportional food factor to multiple with current data

  var food_percent = d3.scaleLinear()
  .domain([foodMin, foodMax])
  .range([0, 100]);

  var food_weight = d3.scaleLinear()
  .domain([0, 100])
  .range([weightMin, weightMax]);

  var food_Population = d3.scaleLinear()
  .domain([0, 100])
  .range([populationMin, populationMax]); // Directly

  var food_Stranding = d3.scaleLinear()
  .domain([0, 100])
  .range([strandingMax, strandingMin]); // Inversely

  var oceanHeat_factor = d3.scaleLinear()
  .domain([oceanHeatMin, oceanHeatMax])
  .range([1, 0]); //Inversely Proportional food factor to multiple with current data

  var oceanHeat_Population = d3.scaleLinear()
  .domain([oceanHeatMin, oceanHeatMax])
  .range([populationMax, populationMin]); // Inversely

  var oceanHeat_Stranding = d3.scaleLinear()
  .domain([oceanHeatMin, oceanHeatMax])
  .range([strandingMin, strandingMax]); // Direct

  var seaLevel_factor = d3.scaleLinear()
  .domain([seaLevelMin, seaLevelMax])
  .range([0, 1]); //Directly Proportional food factor to multiple with current data

  var seaLevel_Population = d3.scaleLinear()
  .domain([seaLevelMin, seaLevelMax])
  .range([populationMax, populationMin]); // Inversely

  var seaLevel_Stranding = d3.scaleLinear()
  .domain([seaLevelMin, seaLevelMax])
  .range([strandingMin, strandingMax]); // Direct

  var co2_factor = d3.scaleLinear()
  .domain([co2Min, co2Max])
  .range([1, 0]); //Inversely Proportional food factor to multiple with current data

  var co2_Population = d3.scaleLinear()
  .domain([co2Min, co2Max])
  .range([populationMax, populationMin]); // Inversely

  var co2_Stranding = d3.scaleLinear()
  .domain([co2Min, co2Max])
  .range([strandingMin, strandingMax]); // Direct

  //FORM LOAD EVENT
  $(document).ready(function() {
    $('.w3-button').removeClass("clicked");
    $('#2008').addClass("clicked");
    map(2008);
  });

  $(document).mousemove(function( event ) {
    //Hover Food Arc
    group1.selectAll('path.food')
    .on('mouseover', function () {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(foodData())
          .style("z-index", 1)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
      div.transition()
         .duration(500)
         .style("opacity", 0)
         .style("z-index", -1);
    });
    //Hover Ocean Heat
    group1.selectAll('path.ocean-heat')
    .on('mouseover', function () {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(oceanHeatData())
          .style("z-index", 1)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
      div.transition()
         .duration(500)
         .style("z-index", -1)
         .style("opacity", 0);
    });
    //Hover seaLevel
    group1.selectAll('path.sealevel')
    .on('mouseover', function () {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(seaLevelData())
          .style("z-index", 1)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
      div.transition()
         .duration(500)
         .style("z-index", -1)
         .style("opacity", 0);
    });
    //Hover CO2
    group1.selectAll('path.co2')
    .on('mouseover', function () {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(co2Data())
          .style("z-index", 1)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
      div.transition()
         .duration(500)
         .style("z-index", -1)
         .style("opacity", 0);
    });
    //Hover FoodEffects
    group2.selectAll('path.foodEffects')
    .on('mouseover', function () {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(foodData())
          .style("z-index", 1)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
      div.transition()
         .duration(500)
         .style("z-index", -1)
         .style("opacity", 0);
    });
    //Hover Weight
    group2.selectAll('path.weight')
    .on('mouseover', function () {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(weightData())
          .style("z-index", 1)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
      div.transition()
         .duration(500)
         .style("z-index", -1)
         .style("opacity", 0);
    });
    //Hover Population
    group2.selectAll('path.population')
    .on('mouseover', function () {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(populationData())
          .style("z-index", 1)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
      div.transition()
         .duration(500)
         .style("z-index", -1)
         .style("opacity", 0);
    });
    //Hover Stranding
    group2.selectAll('path.stranding')
    .on('mouseover', function () {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(strandingData())
          .style("z-index", 1)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
      div.transition()
         .duration(500)
         .style("z-index", -1)
         .style("opacity", 0);
    });
  });

  function foodData() {
    var foodContent;
    var fn = [];
    var sn = [];
    if (YEAR === 2008) {
      changed_data.year2008.food.north.forEach(function (e) {
        fn.push(e.toFixed(2));
      });
      changed_data.year2008.food.south.forEach(function (e) {
        sn.push(e.toFixed(2));
      });
      foodContent = "\
      <label><strong style='color:#898989'>Food (Catch Rates):  </strong> </label><br> \
      <label style='color:#898989'>North:  \
      <span style='color:#898989'>" + fn + "</span></label>" + "<br>" +
      "<label style='color:#898989'>South:  \
      <span style='color:#898989'>" + sn + "</span></label>" + "<br>";
    }
    if (YEAR === 2010) {
      changed_data.year2010.food.north.forEach(function (e) {
        fn.push(e.toFixed(2));
      });
      changed_data.year2010.food.south.forEach(function (e) {
        sn.push(e.toFixed(2));
      });
      foodContent = "\
      <label><strong style='color:#898989'>Food (Catch Rates):  </strong> </label><br> \
      <label style='color:#898989'>North:  \
      <span style='color:#898989'>" + fn + "</span></label>" + "<br>" +
      "<label style='color:#898989'>South:  \
      <span style='color:#898989'>" + sn + "</span></label>" + "<br>";
    }
    if (YEAR === 2013) {
      changed_data.year2013.food.north.forEach(function (e) {
        fn.push(e.toFixed(2));
      });
      changed_data.year2013.food.south.forEach(function (e) {
        sn.push(e.toFixed(2));
      });
      foodContent = "\
      <label><strong style='color:#898989'>Food (Catch Rates):  </strong> </label><br> \
      <label style='color:#898989'>North:  \
      <span style='color:#898989'>" + fn + "</span></label>" + "<br>" +
      "<label style='color:#898989'>South:  \
      <span style='color:#898989'>" + sn + "</span></label>" + "<br>";
    }
    if (YEAR === 2016) {
      changed_data.year2016.food.north.forEach(function (e) {
        fn.push(e.toFixed(2));
      });
      changed_data.year2016.food.south.forEach(function (e) {
        sn.push(e.toFixed(2));
      });
      foodContent = "\
      <label><strong style='color:#898989'>Food (Catch Rates):  </strong> </label><br> \
      <label style='color:#898989'>North:  \
      <span style='color:#898989'>" + fn + "</span></label>" + "<br>" +
      "<label style='color:#898989'>South:  \
      <span style='color:#898989'>" + sn + "</span></label>" + "<br>";
    }
    return foodContent;
  }

  function oceanHeatData() {
    var oceanHeatContent;
    var fn = [];
    var sn = [];
    if (YEAR === 2008) {
      oceanHeatContent = "<label><strong style='color:#2D629F'>Ocean Heat: </strong> </label><br> \
      <label style='color:#2D629F'>North:  \
      <span style='color:#2D629F'>" + parseFloat(changed_data.year2008.oceanHeat.north).toFixed(3) + " x 10<sup>22</sup> J</span></label>" + "<br>" +
      "<label style='color:#2D629F'>South: \
      <span style='color:#2D629F'>" + parseFloat(changed_data.year2008.oceanHeat.south).toFixed(3) + " x 10<sup>22</sup> J</span></label>" + "<br>";
    }
    if (YEAR === 2010) {
      oceanHeatContent = "<label><strong style='color:#2D629F'>Ocean Heat: </strong> </label><br> \
      <label style='color:#2D629F'>North:  \
      <span style='color:#2D629F'>" + parseFloat(changed_data.year2010.oceanHeat.north).toFixed(3) + " x 10<sup>22</sup> J</span></label>" + "<br>" +
      "<label style='color:#2D629F'>South: \
      <span style='color:#2D629F'>" + parseFloat(changed_data.year2010.oceanHeat.south).toFixed(3) + " x 10<sup>22</sup> J</span></label>" + "<br>";
    }
    if (YEAR === 2013) {
      oceanHeatContent = "<label><strong style='color:#2D629F'>Ocean Heat: </strong> </label><br> \
      <label style='color:#2D629F'>North:  \
      <span style='color:#2D629F'>" + parseFloat(changed_data.year2013.oceanHeat.north).toFixed(3) + " x 10<sup>22</sup> J</span></label>" + "<br>" +
      "<label style='color:#2D629F'>South: \
      <span style='color:#2D629F'>" + parseFloat(changed_data.year2013.oceanHeat.south).toFixed(3) + " x 10<sup>22</sup> J</span></label>" + "<br>";
    }
    if (YEAR === 2016) {
      oceanHeatContent = "<label><strong style='color:#2D629F'>Ocean Heat: </strong> </label><br> \
      <label style='color:#2D629F'>North:  \
      <span style='color:#2D629F'>" + parseFloat(changed_data.year2016.oceanHeat.north).toFixed(3) + " x 10<sup>22</sup> J</span></label>" + "<br>" +
      "<label style='color:#2D629F'>South: \
      <span style='color:#2D629F'>" + parseFloat(changed_data.year2016.oceanHeat.south).toFixed(3) + " x 10<sup>22</sup> J</span></label>" + "<br>";
    }
    return oceanHeatContent;
  }

  function seaLevelData() {
    var seaLevelContent;
    var fn = [];
    var sn = [];
    if (YEAR === 2008) {
      seaLevelContent = "<label><strong style='color:#6094BA'>Sea Level:  </strong></label> <br> \
      <label style='color:#6094BA'>North:  \
      <span style='color:#6094BA'>" + parseFloat(changed_data.year2008.seaLevel.north).toFixed(3) + " m</span> </label>" + "<br>" +
      "<label style='color:#6094BA'>South: \
      <span style='color:#6094BA'>" + parseFloat(changed_data.year2008.seaLevel.south).toFixed(3) + " m</span> </label>" + "<br>";
    }
    if (YEAR === 2010) {
      seaLevelContent = "<label><strong style='color:#6094BA'>Sea Level:  </strong></label> <br> \
      <label style='color:#6094BA'>North:  \
      <span style='color:#6094BA'>" + parseFloat(changed_data.year2010.seaLevel.north).toFixed(3) + " m</span> </label>" + "<br>" +
      "<label style='color:#6094BA'>South: \
      <span style='color:#6094BA'>" + parseFloat(changed_data.year2010.seaLevel.south).toFixed(3) + " m</span> </label>" + "<br>";
    }
    if (YEAR === 2013) {
      seaLevelContent = "<label><strong style='color:#6094BA'>Sea Level:  </strong></label> <br> \
      <label style='color:#6094BA'>North:  \
      <span style='color:#6094BA'>" + parseFloat(changed_data.year2013.seaLevel.north).toFixed(3) + " m</span> </label>" + "<br>" +
      "<label style='color:#6094BA'>South: \
      <span style='color:#6094BA'>" + parseFloat(changed_data.year2013.seaLevel.south).toFixed(3) + " m</span> </label>" + "<br>";
    }
    if (YEAR === 2016) {
      seaLevelContent = "<label><strong style='color:#6094BA'>Sea Level:  </strong></label> <br> \
      <label style='color:#6094BA'>North:  \
      <span style='color:#6094BA'>" + parseFloat(changed_data.year2016.seaLevel.north).toFixed(3) + " m</span> </label>" + "<br>" +
      "<label style='color:#6094BA'>South: \
      <span style='color:#6094BA'>" + parseFloat(changed_data.year2016.seaLevel.south).toFixed(3) + " m</span> </label>" + "<br>";
    }
    return seaLevelContent;
  }

  function co2Data() {
    var co2Content;
    if (YEAR === 2008) {
      co2Content = "\
      <label><strong style='color:#96B4BE'>Carbon Dioxide:  </strong> </label><br> \
      <label style='color:#96B4BE'>North: \
      <span style='color:#96B4BE'>" + changed_data.year2008.co2.north + " ppm</span> </label>" + "<br>" +
      "<label style='color:#96B4BE'>South: \
      <span style='color:#96B4BE'>" + changed_data.year2008.co2.south + " ppm</span> </label>" + "<br>";
    }
    if (YEAR === 2010) {
      co2Content = "\
      <label><strong style='color:#96B4BE'>Carbon Dioxide:  </strong> </label><br> \
      <label style='color:#96B4BE'>North: \
      <span style='color:#96B4BE'>" + changed_data.year2010.co2.north + " ppm</span> </label>" + "<br>" +
      "<label style='color:#96B4BE'>South: \
      <span style='color:#96B4BE'>" + changed_data.year2010.co2.south + " ppm</span> </label>" + "<br>";
    }
    if (YEAR === 2013) {
      co2Content = "\
      <label><strong style='color:#96B4BE'>Carbon Dioxide:  </strong> </label><br> \
      <label style='color:#96B4BE'>North: \
      <span style='color:#96B4BE'>" + changed_data.year2013.co2.north + " ppm</span> </label>" + "<br>" +
      "<label style='color:#96B4BE'>South: \
      <span style='color:#96B4BE'>" + changed_data.year2013.co2.south + " ppm</span> </label>" + "<br>";
    }
    if (YEAR === 2016) {
      co2Content = "\
      <label><strong style='color:#96B4BE'>Carbon Dioxide:  </strong> </label><br> \
      <label style='color:#96B4BE'>North: \
      <span style='color:#96B4BE'>" + changed_data.year2016.co2.north + " ppm</span> </label>" + "<br>" +
      "<label style='color:#96B4BE'>South: \
      <span style='color:#96B4BE'>" + changed_data.year2016.co2.south + " ppm</span> </label>" + "<br>";
    }
    return co2Content;
  }

  function weightData() {
    var weightContent;
    var wn = [];
    var ws = [];
    if (YEAR === 2008) {
      changed_data.year2008.weight.north.forEach(function (e) {
        wn.push(e.toFixed(1));
      });
      changed_data.year2008.weight.south.forEach(function (e) {
        ws.push(e.toFixed(1));
      });
      weightContent = "\
      <label><strong style='color:#C73433'>Weight:  </strong></label> <br>\
      <label style='color:#C73433'>North: \
      <span style='color:#C73433'>" + wn[0] + " Kgs, " + wn[1] + " Kgs</span></label>" + "<br>" +
      "<label style='color:#C73433'>South: \
      <span style='color:#C73433'>" + ws[0] + " Kgs, " + ws[1] + " Kgs</span></label>";
    }
    if (YEAR === 2010) {
      changed_data.year2010.weight.north.forEach(function (e) {
        wn.push(e.toFixed(1));
      });
      changed_data.year2010.weight.south.forEach(function (e) {
        ws.push(e.toFixed(1));
      });
      weightContent = "\
      <label><strong style='color:#C73433'>Weight:  </strong></label> <br>\
      <label style='color:#C73433'>North: \
      <span style='color:#C73433'>" + wn[0] + " Kgs, " + wn[1] + " Kgs</span></label>" + "<br>" +
      "<label style='color:#C73433'>South: \
      <span style='color:#C73433'>" + ws[0] + " Kgs, " + ws[1] + " Kgs</span></label>";
    }
    if (YEAR === 2013) {
      changed_data.year2013.weight.north.forEach(function (e) {
        wn.push(e.toFixed(1));
      });
      changed_data.year2013.weight.south.forEach(function (e) {
        ws.push(e.toFixed(1));
      });
      weightContent = "\
      <label><strong style='color:#C73433'>Weight:  </strong></label> <br>\
      <label style='color:#C73433'>North: \
      <span style='color:#C73433'>" + wn[0] + " Kgs, " + wn[1] + " Kgs</span></label>" + "<br>" +
      "<label style='color:#C73433'>South: \
      <span style='color:#C73433'>" + ws[0] + " Kgs, " + ws[1] + " Kgs</span></label>";
    }
    if (YEAR === 2016) {
      changed_data.year2016.weight.north.forEach(function (e) {
        wn.push(e.toFixed(1));
      });
      changed_data.year2016.weight.south.forEach(function (e) {
        ws.push(e.toFixed(1));
      });
      weightContent = "\
      <label><strong style='color:#C73433'>Weight:  </strong></label> <br>\
      <label style='color:#C73433'>North: \
      <span style='color:#C73433'>" + wn[0] + " Kgs, " + wn[1] + " Kgs</span></label>" + "<br>" +
      "<label style='color:#C73433'>South: \
      <span style='color:#C73433'>" + ws[0] + " Kgs, " + ws[1] + " Kgs</span></label>";
    }
    return weightContent;
  }

  function populationData() {
    var populationContent;
    if (YEAR === 2008) {
      populationContent = "\
      <label><strong style='color:#C85F51'>Population:  </strong> </label><br> \
      <label style='color:#C85F51'>North: \
      <span style='color:#C85F51'>" + changed_data.year2008.population.north + "</span></label>" + "<br>" +
      "<label style='color:#C85F51'>South: \
      <span style='color:#C85F51'>" + changed_data.year2008.population.south + "</span></label>";
    }
    if (YEAR === 2010) {
      populationContent = "\
      <label><strong style='color:#C85F51'>Population:  </strong> </label><br> \
      <label style='color:#C85F51'>North: \
      <span style='color:#C85F51'>" + changed_data.year2010.population.north + "</span></label>" + "<br>" +
      "<label style='color:#C85F51'>South: \
      <span style='color:#C85F51'>" + changed_data.year2010.population.south + "</span></label>";
    }
    if (YEAR === 2013) {
      populationContent = "\
      <label><strong style='color:#C85F51'>Population:  </strong> </label><br> \
      <label style='color:#C85F51'>North: \
      <span style='color:#C85F51'>" + changed_data.year2013.population.north + "</span></label>" + "<br>" +
      "<label style='color:#C85F51'>South: \
      <span style='color:#C85F51'>" + changed_data.year2013.population.south + "</span></label>";
    }
    if (YEAR === 2016) {
      populationContent = "\
      <label><strong style='color:#C85F51'>Population:  </strong> </label><br> \
      <label style='color:#C85F51'>North: \
      <span style='color:#C85F51'>" + changed_data.year2016.population.north + "</span></label>" + "<br>" +
      "<label style='color:#C85F51'>South: \
      <span style='color:#C85F51'>" + changed_data.year2016.population.south + "</span></label>";
    }
    return populationContent;
  }

  function strandingData() {
    var strandingContent;
    if (YEAR === 2008) {
      strandingContent = "\
      <label><strong style='color:#CF9694'>Stranding: </strong></label> <br> \
      <label style='color:#CF9694'>North: \
      <span style='color:#CF9694'>" + changed_data.year2008.stranding.north + "</span></label>" + "<br>" +
      "<label style='color:#CF9694'>South: \
      <span style='color:#CF9694'>" + changed_data.year2008.stranding.south + "</span></label>" + "<br>";
    }
    if (YEAR === 2010) {
      strandingContent = "\
      <label><strong style='color:#CF9694'>Stranding: </strong></label> <br> \
      <label style='color:#CF9694'>North: \
      <span style='color:#CF9694'>" + changed_data.year2010.stranding.north + "</span></label>" + "<br>" +
      "<label style='color:#CF9694'>South: \
      <span style='color:#CF9694'>" + changed_data.year2010.stranding.south + "</span></label>" + "<br>";
    }
    if (YEAR === 2013) {
      strandingContent = "\
      <label><strong style='color:#CF9694'>Stranding: </strong></label> <br> \
      <label style='color:#CF9694'>North: \
      <span style='color:#CF9694'>" + changed_data.year2013.stranding.north + "</span></label>" + "<br>" +
      "<label style='color:#CF9694'>South: \
      <span style='color:#CF9694'>" + changed_data.year2013.stranding.south + "</span></label>" + "<br>";
    }
    if (YEAR === 2016) {
      strandingContent = "\
      <label><strong style='color:#CF9694'>Stranding: </strong></label> <br> \
      <label style='color:#CF9694'>North: \
      <span style='color:#CF9694'>" + changed_data.year2016.stranding.north + "</span></label>" + "<br>" +
      "<label style='color:#CF9694'>South: \
      <span style='color:#CF9694'>" + changed_data.year2016.stranding.south + "</span></label>" + "<br>";
    }
    return strandingContent;
  }

  //BUTTON EVENTS
  $('#2008').on('click', function (e) {
    $('.w3-button').removeClass("clicked");
    $(this).addClass("clicked");
    map(2008);
  });

  $('#2010').on('click', function (e) {
    $('.w3-button').removeClass("clicked");
    $(this).addClass("clicked");
    map(2010);
  });

  $('#2013').on('click', function (e) {
    $('.w3-button').removeClass("clicked");
    $(this).addClass("clicked");
    map(2013);
  });

  $('#2016').on('click', function (e) {
    $('.w3-button').removeClass("clicked");
    $(this).addClass("clicked");
    map(2016);
  });

  //SLIDER EVENTS
  $('#food_range_n').on('change', function (e) {
    $('#food_val_n').val(this.value + '%');
    slider_food_n_val = this.value;
    foodChanges(this.value, YEAR, 'north');
  });

  $('#food_range_s').on('change', function (e) {
    $('#food_val_s').val(this.value + '%');
    slider_food_s_val = this.value;
    foodChanges(this.value, YEAR, 'south');
  });

  $('#oceanHeat_range_n').on('change', function (e) {
    $('#oceanheat_val_n').val(parseFloat(this.value).toFixed(2) + ' X 10^22 J');
    oceanHeatChanges(this.value, YEAR, 'north');
  });

  $('#oceanHeat_range_s').on('change', function (e) {
    $('#oceanheat_val_s').val(parseFloat(this.value).toFixed(2) + ' X 10^22 J');
    oceanHeatChanges(this.value, YEAR, 'south');
  });

  $('#seaLevel_range_n').on('change', function (e) {
    $('#sealevel_val_n').val(parseFloat(this.value).toFixed(3) + ' m');
    seaLevelChanges(this.value, YEAR, 'north');
  });

  $('#seaLevel_range_s').on('change', function (e) {
    $('#sealevel_val_s').val(parseFloat(this.value).toFixed(3) + ' m');
    seaLevelChanges(this.value, YEAR, 'south');
  });

  $('#co2_range_n').on('change', function (e) {
    $('#co2_val_n').val(this.value + ' ppm');
    co2Changes(this.value, YEAR, 'north');
  });

  $('#co2_range_s').on('change', function (e) {
    $('#co2_val_s').val(this.value + ' ppm');
    co2Changes(this.value, YEAR, 'south');
  });

  function co2Changes(d, year, pole) {
    //each element data will hold slider value.
    var factor = co2_factor(d);
    var values;
    if (year === 2008) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2008.food.north = JSON.parse(JSON.stringify(data.year2008.food.north));
        changed_data.year2008.weight.north = JSON.parse(JSON.stringify(data.year2008.weight.north));
        changed_data.year2008.co2.north = JSON.parse(JSON.stringify(data.year2008.co2.north));
        changed_data.year2008.population.north = JSON.parse(JSON.stringify(data.year2008.population.north));
        changed_data.year2008.stranding.north = JSON.parse(JSON.stringify(data.year2008.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2008.food.north[i] = changed_data.year2008.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2008.weight.north.length; i++) {
          changed_data.year2008.weight.north[i] = changed_data.year2008.weight.north[i] * factor;
          if(changed_data.year2008.weight.north[i] < 10) {
            changed_data.year2008.weight.north[i] = 10;
          }
          if(changed_data.year2008.weight.north[i] > 25) {
            changed_data.year2008.weight.north[i] = 25;
          }
        }
        //co2 Change
        changed_data.year2008.co2.north = d;
        //population Changes
        changed_data.year2008.population.north = co2_Population(d);
        //Stranding Changes
        changed_data.year2008.stranding.north = co2_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2008.food.south = JSON.parse(JSON.stringify(data.year2008.food.south));
        changed_data.year2008.weight.south = JSON.parse(JSON.stringify(data.year2008.weight.south));
        changed_data.year2008.co2.south = JSON.parse(JSON.stringify(data.year2008.co2.south));
        changed_data.year2008.population.south = JSON.parse(JSON.stringify(data.year2008.population.south));
        changed_data.year2008.stranding.south = JSON.parse(JSON.stringify(data.year2008.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2008.food.south.length; i++) {
          changed_data.year2008.food.south[i] = changed_data.year2008.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2008.weight.south.length; i++) {
          changed_data.year2008.weight.south[i] = changed_data.year2008.weight.south[i] * factor;
          if(changed_data.year2008.weight.south[i] < 10) {
            changed_data.year2008.weight.south[i] = 10;
          }
          if(changed_data.year2008.weight.south[i] > 25) {
            changed_data.year2008.weight.south[i] = 25;
          }
        }
        //co2 Change
        changed_data.year2008.co2.south = d;
        //population Changes
        changed_data.year2008.population.south = co2_Population(d);
        //Stranding Changes
        changed_data.year2008.stranding.south = co2_Stranding(d);
      }
      values = changed_data.year2008;
    }
    if (year === 2010) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2010.food.north = JSON.parse(JSON.stringify(data.year2010.food.north));
        changed_data.year2010.weight.north = JSON.parse(JSON.stringify(data.year2010.weight.north));
        changed_data.year2010.co2.north = JSON.parse(JSON.stringify(data.year2010.co2.north));
        changed_data.year2010.population.north = JSON.parse(JSON.stringify(data.year2010.population.north));
        changed_data.year2010.stranding.north = JSON.parse(JSON.stringify(data.year2010.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2010.food.north[i] = changed_data.year2010.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2010.weight.north.length; i++) {
          changed_data.year2010.weight.north[i] = changed_data.year2010.weight.north[i] * factor;
          if(changed_data.year2010.weight.north[i] < 10) {
            changed_data.year2010.weight.north[i] = 10;
          }
          if(changed_data.year2010.weight.north[i] > 25) {
            changed_data.year2010.weight.north[i] = 25;
          }
        }
        //co2 Change
        changed_data.year2010.co2.north = d;
        //population Changes
        changed_data.year2010.population.north = co2_Population(d);
        //Stranding Changes
        changed_data.year2010.stranding.north = co2_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2010.food.south = JSON.parse(JSON.stringify(data.year2010.food.south));
        changed_data.year2010.weight.south = JSON.parse(JSON.stringify(data.year2010.weight.south));
        changed_data.year2010.co2.south = JSON.parse(JSON.stringify(data.year2010.co2.south));
        changed_data.year2010.population.south = JSON.parse(JSON.stringify(data.year2010.population.south));
        changed_data.year2010.stranding.south = JSON.parse(JSON.stringify(data.year2010.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2010.food.south.length; i++) {
          changed_data.year2010.food.south[i] = changed_data.year2010.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2010.weight.south.length; i++) {
          changed_data.year2010.weight.south[i] = changed_data.year2010.weight.south[i] * factor;
          if(changed_data.year2010.weight.south[i] < 10) {
            changed_data.year2010.weight.south[i] = 10;
          }
          if(changed_data.year2010.weight.south[i] > 25) {
            changed_data.year2010.weight.south[i] = 25;
          }
        }
        //co2 Change
        changed_data.year2010.co2.south = d;
        //population Changes
        changed_data.year2010.population.south = co2_Population(d);
        //Stranding Changes
        changed_data.year2010.stranding.south = co2_Stranding(d);
      }
      values = changed_data.year2010;
    }
    if (year === 2013) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2013.food.north = JSON.parse(JSON.stringify(data.year2013.food.north));
        changed_data.year2013.weight.north = JSON.parse(JSON.stringify(data.year2013.weight.north));
        changed_data.year2013.co2.north = JSON.parse(JSON.stringify(data.year2013.co2.north));
        changed_data.year2013.population.north = JSON.parse(JSON.stringify(data.year2013.population.north));
        changed_data.year2013.stranding.north = JSON.parse(JSON.stringify(data.year2013.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2013.food.north[i] = changed_data.year2013.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2013.weight.north.length; i++) {
          changed_data.year2013.weight.north[i] = changed_data.year2013.weight.north[i] * factor;
          if(changed_data.year2013.weight.north[i] < 10) {
            changed_data.year2013.weight.north[i] = 10;
          }
          if(changed_data.year2013.weight.north[i] > 25) {
            changed_data.year2013.weight.north[i] = 25;
          }
        }
        //co2 Change
        changed_data.year2013.co2.north = d;
        //population Changes
        changed_data.year2013.population.north = co2_Population(d);
        //Stranding Changes
        changed_data.year2013.stranding.north = co2_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2013.food.south = JSON.parse(JSON.stringify(data.year2013.food.south));
        changed_data.year2013.weight.south = JSON.parse(JSON.stringify(data.year2013.weight.south));
        changed_data.year2013.co2.south = JSON.parse(JSON.stringify(data.year2013.co2.south));
        changed_data.year2013.population.south = JSON.parse(JSON.stringify(data.year2013.population.south));
        changed_data.year2013.stranding.south = JSON.parse(JSON.stringify(data.year2013.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2013.food.south.length; i++) {
          changed_data.year2013.food.south[i] = changed_data.year2013.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2013.weight.south.length; i++) {
          changed_data.year2013.weight.south[i] = changed_data.year2013.weight.south[i] * factor;
          if(changed_data.year2013.weight.south[i] < 10) {
            changed_data.year2013.weight.south[i] = 10;
          }
          if(changed_data.year2013.weight.south[i] > 25) {
            changed_data.year2013.weight.south[i] = 25;
          }
        }
        //co2 Change
        changed_data.year2013.co2.south = d;
        //population Changes
        changed_data.year2013.population.south = co2_Population(d);
        //Stranding Changes
        changed_data.year2013.stranding.south = co2_Stranding(d);
      }
      values = changed_data.year2013;
    }
    if (year === 2016) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2016.food.north = JSON.parse(JSON.stringify(data.year2016.food.north));
        changed_data.year2016.weight.north = JSON.parse(JSON.stringify(data.year2016.weight.north));
        changed_data.year2016.co2.north = JSON.parse(JSON.stringify(data.year2016.co2.north));
        changed_data.year2016.population.north = JSON.parse(JSON.stringify(data.year2016.population.north));
        changed_data.year2016.stranding.north = JSON.parse(JSON.stringify(data.year2016.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2016.food.north[i] = changed_data.year2016.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2016.weight.north.length; i++) {
          changed_data.year2016.weight.north[i] = changed_data.year2016.weight.north[i] * factor;
          if(changed_data.year2016.weight.north[i] < 10) {
            changed_data.year2016.weight.north[i] = 10;
          }
          if(changed_data.year2016.weight.north[i] > 25) {
            changed_data.year2016.weight.north[i] = 25;
          }
        }
        //co2 Change
        changed_data.year2016.co2.north = d;
        //population Changes
        changed_data.year2016.population.north = co2_Population(d);
        //Stranding Changes
        changed_data.year2016.stranding.north = co2_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2016.food.south = JSON.parse(JSON.stringify(data.year2016.food.south));
        changed_data.year2016.weight.south = JSON.parse(JSON.stringify(data.year2016.weight.south));
        changed_data.year2016.co2.south = JSON.parse(JSON.stringify(data.year2016.co2.south));
        changed_data.year2016.population.south = JSON.parse(JSON.stringify(data.year2016.population.south));
        changed_data.year2016.stranding.south = JSON.parse(JSON.stringify(data.year2016.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2016.food.south.length; i++) {
          changed_data.year2016.food.south[i] = changed_data.year2016.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2016.weight.south.length; i++) {
          changed_data.year2016.weight.south[i] = changed_data.year2016.weight.south[i] * factor;
          if(changed_data.year2016.weight.south[i] < 10) {
            changed_data.year2016.weight.south[i] = 10;
          }
          if(changed_data.year2016.weight.south[i] > 25) {
            changed_data.year2016.weight.south[i] = 25;
          }
        }
        //co2 Change
        changed_data.year2016.co2.south = d;
        //population Changes
        changed_data.year2016.population.south = co2_Population(d);
        //Stranding Changes
        changed_data.year2016.stranding.south = co2_Stranding(d);
      }
      values = changed_data.year2016;
    }

    food(values.food.north, values.food.south);
    co2(values.co2.north, values.co2.south);
    foodEffects(values.food.north, values.food.south);
    weight(values.weight.north, values.weight.south);
    population(values.population.north, values.population.south);
    stranding(values.stranding.north, values.stranding.south);
  }

  function seaLevelChanges(d, year, pole) {
    //each element data will hold slider value.
    var factor = seaLevel_factor(d);
    var values;
    if (year === 2008) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2008.food.north = JSON.parse(JSON.stringify(data.year2008.food.north));
        changed_data.year2008.weight.north = JSON.parse(JSON.stringify(data.year2008.weight.north));
        changed_data.year2008.seaLevel.north = JSON.parse(JSON.stringify(data.year2008.seaLevel.north));
        changed_data.year2008.population.north = JSON.parse(JSON.stringify(data.year2008.population.north));
        changed_data.year2008.stranding.north = JSON.parse(JSON.stringify(data.year2008.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2008.food.north[i] = changed_data.year2008.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2008.weight.north.length; i++) {
          changed_data.year2008.weight.north[i] = changed_data.year2008.weight.north[i] * factor;
          if(changed_data.year2008.weight.north[i] < 10) {
            changed_data.year2008.weight.north[i] = 10;
          }
          if(changed_data.year2008.weight.north[i] > 25) {
            changed_data.year2008.weight.north[i] = 25;
          }
        }
        //seaLevel Change
        changed_data.year2008.seaLevel.north = d;
        //population Changes
        changed_data.year2008.population.north = seaLevel_Population(d);
        //Stranding Changes
        changed_data.year2008.stranding.north = seaLevel_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2008.food.south = JSON.parse(JSON.stringify(data.year2008.food.south));
        changed_data.year2008.weight.south = JSON.parse(JSON.stringify(data.year2008.weight.south));
        changed_data.year2008.seaLevel.south = JSON.parse(JSON.stringify(data.year2008.seaLevel.south));
        changed_data.year2008.population.south = JSON.parse(JSON.stringify(data.year2008.population.south));
        changed_data.year2008.stranding.south = JSON.parse(JSON.stringify(data.year2008.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2008.food.south.length; i++) {
          changed_data.year2008.food.south[i] = changed_data.year2008.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2008.weight.south.length; i++) {
          changed_data.year2008.weight.south[i] = changed_data.year2008.weight.south[i] * factor;
          if(changed_data.year2008.weight.south[i] < 10) {
            changed_data.year2008.weight.south[i] = 10;
          }
          if(changed_data.year2008.weight.south[i] > 25) {
            changed_data.year2008.weight.south[i] = 25;
          }
        }
        //seaLevel Change
        changed_data.year2008.seaLevel.south = d;
        //population Changes
        changed_data.year2008.population.south = seaLevel_Population(d);
        //Stranding Changes
        changed_data.year2008.stranding.south = seaLevel_Stranding(d);
      }
      values = changed_data.year2008;
    }
    if (year === 2010) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2010.food.north = JSON.parse(JSON.stringify(data.year2010.food.north));
        changed_data.year2010.weight.north = JSON.parse(JSON.stringify(data.year2010.weight.north));
        changed_data.year2010.seaLevel.north = JSON.parse(JSON.stringify(data.year2010.seaLevel.north));
        changed_data.year2010.population.north = JSON.parse(JSON.stringify(data.year2010.population.north));
        changed_data.year2010.stranding.north = JSON.parse(JSON.stringify(data.year2010.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2010.food.north[i] = changed_data.year2010.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2010.weight.north.length; i++) {
          changed_data.year2010.weight.north[i] = changed_data.year2010.weight.north[i] * factor;
          if(changed_data.year2010.weight.north[i] < 10) {
            changed_data.year2010.weight.north[i] = 10;
          }
          if(changed_data.year2010.weight.north[i] > 25) {
            changed_data.year2010.weight.north[i] = 25;
          }
        }
        //seaLevel Change
        changed_data.year2010.seaLevel.north = d;
        //population Changes
        changed_data.year2010.population.north = seaLevel_Population(d);
        //Stranding Changes
        changed_data.year2010.stranding.north = seaLevel_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2010.food.south = JSON.parse(JSON.stringify(data.year2010.food.south));
        changed_data.year2010.weight.south = JSON.parse(JSON.stringify(data.year2010.weight.south));
        changed_data.year2010.seaLevel.south = JSON.parse(JSON.stringify(data.year2010.seaLevel.south));
        changed_data.year2010.population.south = JSON.parse(JSON.stringify(data.year2010.population.south));
        changed_data.year2010.stranding.south = JSON.parse(JSON.stringify(data.year2010.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2010.food.south.length; i++) {
          changed_data.year2010.food.south[i] = changed_data.year2010.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2010.weight.south.length; i++) {
          changed_data.year2010.weight.south[i] = changed_data.year2010.weight.south[i] * factor;
          if(changed_data.year2010.weight.south[i] < 10) {
            changed_data.year2010.weight.south[i] = 10;
          }
          if(changed_data.year2010.weight.south[i] > 25) {
            changed_data.year2010.weight.south[i] = 25;
          }
        }
        //seaLevel Change
        changed_data.year2010.seaLevel.south = d;
        //population Changes
        changed_data.year2010.population.south = seaLevel_Population(d);
        //Stranding Changes
        changed_data.year2010.stranding.south = seaLevel_Stranding(d);
      }
      values = changed_data.year2010;
    }
    if (year === 2013) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2013.food.north = JSON.parse(JSON.stringify(data.year2013.food.north));
        changed_data.year2013.weight.north = JSON.parse(JSON.stringify(data.year2013.weight.north));
        changed_data.year2013.seaLevel.north = JSON.parse(JSON.stringify(data.year2013.seaLevel.north));
        changed_data.year2013.population.north = JSON.parse(JSON.stringify(data.year2013.population.north));
        changed_data.year2013.stranding.north = JSON.parse(JSON.stringify(data.year2013.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2013.food.north[i] = changed_data.year2013.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2013.weight.north.length; i++) {
          changed_data.year2013.weight.north[i] = changed_data.year2013.weight.north[i] * factor;
          if(changed_data.year2013.weight.north[i] < 10) {
            changed_data.year2013.weight.north[i] = 10;
          }
          if(changed_data.year2013.weight.north[i] > 25) {
            changed_data.year2013.weight.north[i] = 25;
          }
        }
        //seaLevel Change
        changed_data.year2013.seaLevel.north = d;
        //population Changes
        changed_data.year2013.population.north = seaLevel_Population(d);
        //Stranding Changes
        changed_data.year2013.stranding.north = seaLevel_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2013.food.south = JSON.parse(JSON.stringify(data.year2013.food.south));
        changed_data.year2013.weight.south = JSON.parse(JSON.stringify(data.year2013.weight.south));
        changed_data.year2013.seaLevel.south = JSON.parse(JSON.stringify(data.year2013.seaLevel.south));
        changed_data.year2013.population.south = JSON.parse(JSON.stringify(data.year2013.population.south));
        changed_data.year2013.stranding.south = JSON.parse(JSON.stringify(data.year2013.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2013.food.south.length; i++) {
          changed_data.year2013.food.south[i] = changed_data.year2013.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2013.weight.south.length; i++) {
          changed_data.year2013.weight.south[i] = changed_data.year2013.weight.south[i] * factor;
          if(changed_data.year2013.weight.south[i] < 10) {
            changed_data.year2013.weight.south[i] = 10;
          }
          if(changed_data.year2013.weight.south[i] > 25) {
            changed_data.year2013.weight.south[i] = 25;
          }
        }
        //seaLevel Change
        changed_data.year2013.seaLevel.south = d;
        //population Changes
        changed_data.year2013.population.south = seaLevel_Population(d);
        //Stranding Changes
        changed_data.year2013.stranding.south = seaLevel_Stranding(d);
      }
      values = changed_data.year2013;
    }
    if (year === 2016) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2016.food.north = JSON.parse(JSON.stringify(data.year2016.food.north));
        changed_data.year2016.weight.north = JSON.parse(JSON.stringify(data.year2016.weight.north));
        changed_data.year2016.seaLevel.north = JSON.parse(JSON.stringify(data.year2016.seaLevel.north));
        changed_data.year2016.population.north = JSON.parse(JSON.stringify(data.year2016.population.north));
        changed_data.year2016.stranding.north = JSON.parse(JSON.stringify(data.year2016.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2016.food.north[i] = changed_data.year2016.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2016.weight.north.length; i++) {
          changed_data.year2016.weight.north[i] = changed_data.year2016.weight.north[i] * factor;
          if(changed_data.year2016.weight.north[i] < 10) {
            changed_data.year2016.weight.north[i] = 10;
          }
          if(changed_data.year2016.weight.north[i] > 25) {
            changed_data.year2016.weight.north[i] = 25;
          }
        }
        //seaLevel Change
        changed_data.year2016.seaLevel.north = d;
        //population Changes
        changed_data.year2016.population.north = seaLevel_Population(d);
        //Stranding Changes
        changed_data.year2016.stranding.north = seaLevel_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2016.food.south = JSON.parse(JSON.stringify(data.year2016.food.south));
        changed_data.year2016.weight.south = JSON.parse(JSON.stringify(data.year2016.weight.south));
        changed_data.year2016.seaLevel.south = JSON.parse(JSON.stringify(data.year2016.seaLevel.south));
        changed_data.year2016.population.south = JSON.parse(JSON.stringify(data.year2016.population.south));
        changed_data.year2016.stranding.south = JSON.parse(JSON.stringify(data.year2016.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2016.food.south.length; i++) {
          changed_data.year2016.food.south[i] = changed_data.year2016.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2016.weight.south.length; i++) {
          changed_data.year2016.weight.south[i] = changed_data.year2016.weight.south[i] * factor;
          if(changed_data.year2016.weight.south[i] < 10) {
            changed_data.year2016.weight.south[i] = 10;
          }
          if(changed_data.year2016.weight.south[i] > 25) {
            changed_data.year2016.weight.south[i] = 25;
          }
        }
        //seaLevel Change
        changed_data.year2016.seaLevel.south = d;
        //population Changes
        changed_data.year2016.population.south = seaLevel_Population(d);
        //Stranding Changes
        changed_data.year2016.stranding.south = seaLevel_Stranding(d);
      }
      values = changed_data.year2016;
    }


    food(values.food.north, values.food.south);
    seaLevel(values.seaLevel.north, values.seaLevel.south);
    foodEffects(values.food.north, values.food.south);
    weight(values.weight.north, values.weight.south);
    population(values.population.north, values.population.south);
    stranding(values.stranding.north, values.stranding.south);
  }


  function oceanHeatChanges(d, year, pole) {
    //each element data will hold slider value.
    var factor = oceanHeat_factor(d);
    var values;
    if (year === 2008) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2008.food.north = JSON.parse(JSON.stringify(data.year2008.food.north));
        changed_data.year2008.weight.north = JSON.parse(JSON.stringify(data.year2008.weight.north));
        changed_data.year2008.oceanHeat.north = JSON.parse(JSON.stringify(data.year2008.oceanHeat.north));
        changed_data.year2008.population.north = JSON.parse(JSON.stringify(data.year2008.population.north));
        changed_data.year2008.stranding.north = JSON.parse(JSON.stringify(data.year2008.stranding.north));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          changed_data.year2008.food.north[i] = changed_data.year2008.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2008.weight.north.length; i++) {
          changed_data.year2008.weight.north[i] = changed_data.year2008.weight.north[i] * factor;
          if(changed_data.year2008.weight.north[i] < 10) {
            changed_data.year2008.weight.north[i] = 10;
          }
          if(changed_data.year2008.weight.north[i] > 25) {
            changed_data.year2008.weight.north[i] = 25;
          }
        }
        //oceanHeat Change
        changed_data.year2008.oceanHeat.north = d;
        //population Changes
        changed_data.year2008.population.north = oceanHeat_Population(d);
        //Stranding Changes
        changed_data.year2008.stranding.north = oceanHeat_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2008.food.south = JSON.parse(JSON.stringify(data.year2008.food.south));
        changed_data.year2008.weight.south = JSON.parse(JSON.stringify(data.year2008.weight.south));
        changed_data.year2008.oceanHeat.south = JSON.parse(JSON.stringify(data.year2008.oceanHeat.south));
        changed_data.year2008.population.south = JSON.parse(JSON.stringify(data.year2008.population.south));
        changed_data.year2008.stranding.south = JSON.parse(JSON.stringify(data.year2008.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2008.food.south.length; i++) {
          changed_data.year2008.food.south[i] = changed_data.year2008.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2008.weight.south.length; i++) {
          changed_data.year2008.weight.south[i] = changed_data.year2008.weight.south[i] * factor;
          if(changed_data.year2008.weight.south[i] < 10) {
            changed_data.year2008.weight.south[i] = 10;
          }
          if(changed_data.year2008.weight.south[i] > 25) {
            changed_data.year2008.weight.south[i] = 25;
          }
        }
        //OceanHeat Change
        changed_data.year2008.oceanHeat.south = d;
        //population Changes
        changed_data.year2008.population.south = oceanHeat_Population(d);
        //Stranding Changes
        changed_data.year2008.stranding.south = oceanHeat_Stranding(d);
      }
      values = changed_data.year2008;
    }

    if (year === 2010) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2010.food.north = JSON.parse(JSON.stringify(data.year2010.food.north));
        changed_data.year2010.weight.north = JSON.parse(JSON.stringify(data.year2010.weight.north));
        changed_data.year2010.oceanHeat.north = JSON.parse(JSON.stringify(data.year2010.oceanHeat.north));
        changed_data.year2010.population.north = JSON.parse(JSON.stringify(data.year2010.population.north));
        changed_data.year2010.stranding.north = JSON.parse(JSON.stringify(data.year2010.stranding.north));

        //Food Changes
        for (var i = 0; i < changed_data.year2010.food.north.length; i++) {
          changed_data.year2010.food.north[i] = changed_data.year2010.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2010.weight.north.length; i++) {
          changed_data.year2010.weight.north[i] = changed_data.year2010.weight.north[i] * factor;
          if(changed_data.year2010.weight.north[i] < 10) {
            changed_data.year2010.weight.north[i] = 10;
          }
          if(changed_data.year2010.weight.north[i] > 25) {
            changed_data.year2010.weight.north[i] = 25;
          }
        }
        //oceanHeat Change
        changed_data.year2010.oceanHeat.north = d;
        //population Changes
        changed_data.year2010.population.north = oceanHeat_Population(d);
        //Stranding Changes
        changed_data.year2010.stranding.north = oceanHeat_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2010.food.south = JSON.parse(JSON.stringify(data.year2010.food.south));
        changed_data.year2010.weight.south = JSON.parse(JSON.stringify(data.year2010.weight.south));
        changed_data.year2010.oceanHeat.south = JSON.parse(JSON.stringify(data.year2010.oceanHeat.south));
        changed_data.year2010.population.south = JSON.parse(JSON.stringify(data.year2010.population.south));
        changed_data.year2010.stranding.south = JSON.parse(JSON.stringify(data.year2010.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2010.food.south.length; i++) {
          changed_data.year2010.food.south[i] = changed_data.year2010.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2010.weight.south.length; i++) {
          changed_data.year2010.weight.south[i] = changed_data.year2010.weight.south[i] * factor;
          if(changed_data.year2010.weight.south[i] < 10) {
            changed_data.year2010.weight.south[i] = 10;
          }
          if(changed_data.year2010.weight.south[i] > 25) {
            changed_data.year2010.weight.south[i] = 25;
          }
        }
        //OceanHeat Change
        changed_data.year2010.oceanHeat.south = d;
        //population Changes
        changed_data.year2010.population.south = oceanHeat_Population(d);
        //Stranding Changes
        changed_data.year2010.stranding.south = oceanHeat_Stranding(d);
      }
      values = changed_data.year2010;
    }

    if (year === 2013) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2013.food.north = JSON.parse(JSON.stringify(data.year2013.food.north));
        changed_data.year2013.weight.north = JSON.parse(JSON.stringify(data.year2013.weight.north));
        changed_data.year2013.oceanHeat.north = JSON.parse(JSON.stringify(data.year2013.oceanHeat.north));
        changed_data.year2013.population.north = JSON.parse(JSON.stringify(data.year2013.population.north));
        changed_data.year2013.stranding.north = JSON.parse(JSON.stringify(data.year2013.stranding.north));

        //Food Changes
        for (var i = 0; i < changed_data.year2013.food.north.length; i++) {
          changed_data.year2013.food.north[i] = changed_data.year2013.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2013.weight.north.length; i++) {
          changed_data.year2013.weight.north[i] = changed_data.year2013.weight.north[i] * factor;
          if(changed_data.year2013.weight.north[i] < 10) {
            changed_data.year2013.weight.north[i] = 10;
          }
          if(changed_data.year2013.weight.north[i] > 25) {
            changed_data.year2013.weight.north[i] = 25;
          }
        }
        //oceanHeat Change
        changed_data.year2013.oceanHeat.north = d;
        //population Changes
        changed_data.year2013.population.north = oceanHeat_Population(d);
        //Stranding Changes
        changed_data.year2013.stranding.north = oceanHeat_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2013.food.south = JSON.parse(JSON.stringify(data.year2013.food.south));
        changed_data.year2013.weight.south = JSON.parse(JSON.stringify(data.year2013.weight.south));
        changed_data.year2013.oceanHeat.south = JSON.parse(JSON.stringify(data.year2013.oceanHeat.south));
        changed_data.year2013.population.south = JSON.parse(JSON.stringify(data.year2013.population.south));
        changed_data.year2013.stranding.south = JSON.parse(JSON.stringify(data.year2013.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2013.food.south.length; i++) {
          changed_data.year2013.food.south[i] = changed_data.year2013.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2013.weight.south.length; i++) {
          changed_data.year2013.weight.south[i] = changed_data.year2013.weight.south[i] * factor;
          if(changed_data.year2013.weight.south[i] < 10) {
            changed_data.year2013.weight.south[i] = 10;
          }
          if(changed_data.year2013.weight.south[i] > 25) {
            changed_data.year2013.weight.south[i] = 25;
          }
        }
        //OceanHeat Change
        changed_data.year2013.oceanHeat.south = d;
        //population Changes
        changed_data.year2013.population.south = oceanHeat_Population(d);
        //Stranding Changes
        changed_data.year2013.stranding.south = oceanHeat_Stranding(d);
      }
      values = changed_data.year2013;
    }

    if (year === 2016) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2016.food.north = JSON.parse(JSON.stringify(data.year2016.food.north));
        changed_data.year2016.weight.north = JSON.parse(JSON.stringify(data.year2016.weight.north));
        changed_data.year2016.oceanHeat.north = JSON.parse(JSON.stringify(data.year2016.oceanHeat.north));
        changed_data.year2016.population.north = JSON.parse(JSON.stringify(data.year2016.population.north));
        changed_data.year2016.stranding.north = JSON.parse(JSON.stringify(data.year2016.stranding.north));

        //Food Changes
        for (var i = 0; i < changed_data.year2016.food.north.length; i++) {
          changed_data.year2016.food.north[i] = changed_data.year2016.food.north[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2016.weight.north.length; i++) {
          changed_data.year2016.weight.north[i] = changed_data.year2016.weight.north[i] * factor;
          if(changed_data.year2016.weight.north[i] < 10) {
            changed_data.year2016.weight.north[i] = 10;
          }
          if(changed_data.year2016.weight.north[i] > 25) {
            changed_data.year2016.weight.north[i] = 25;
          }
        }
        //oceanHeat Change
        changed_data.year2016.oceanHeat.north = d;
        //population Changes
        changed_data.year2016.population.north = oceanHeat_Population(d);
        //Stranding Changes
        changed_data.year2016.stranding.north = oceanHeat_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2016.food.south = JSON.parse(JSON.stringify(data.year2016.food.south));
        changed_data.year2016.weight.south = JSON.parse(JSON.stringify(data.year2016.weight.south));
        changed_data.year2016.oceanHeat.south = JSON.parse(JSON.stringify(data.year2016.oceanHeat.south));
        changed_data.year2016.population.south = JSON.parse(JSON.stringify(data.year2016.population.south));
        changed_data.year2016.stranding.south = JSON.parse(JSON.stringify(data.year2016.stranding.south));

        //Food Changes
        for (var i = 0; i < changed_data.year2016.food.south.length; i++) {
          changed_data.year2016.food.south[i] = changed_data.year2016.food.south[i] * factor;
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2016.weight.south.length; i++) {
          changed_data.year2016.weight.south[i] = changed_data.year2016.weight.south[i] * factor;
          if(changed_data.year2016.weight.south[i] < 10) {
            changed_data.year2016.weight.south[i] = 10;
          }
          if(changed_data.year2016.weight.south[i] > 25) {
            changed_data.year2016.weight.south[i] = 25;
          }
        }
        //OceanHeat Change
        changed_data.year2016.oceanHeat.south = d;
        //population Changes
        changed_data.year2016.population.south = oceanHeat_Population(d);
        //Stranding Changes
        changed_data.year2016.stranding.south = oceanHeat_Stranding(d);
      }
      values = changed_data.year2016;
    }

    food(values.food.north, values.food.south);
    oceanHeat(values.oceanHeat.north, values.oceanHeat.south);
    foodEffects(values.food.north, values.food.south);
    weight(values.weight.north, values.weight.south);
    population(values.population.north, values.population.south);
    stranding(values.stranding.north, values.stranding.south);
  }

  function foodChanges(d, year, pole) {

    //each element data will hold slider value.
    //var factor = food_factor(d); // Not sure
    var values;
    if (year === 2008) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2008.food.north = JSON.parse(JSON.stringify(data.year2008.food.north));
        changed_data.year2008.weight.north = JSON.parse(JSON.stringify(data.year2008.weight.north));
        changed_data.year2008.population.north = JSON.parse(JSON.stringify(data.year2008.population.north));
        changed_data.year2008.stranding.north = JSON.parse(JSON.stringify(data.year2008.stranding.north));
        //Food Changes
        for (var i = 0; i < 4; i++) {
          var tmp = food_factor(changed_data.year2008.food.north[i]);
          if (tmp < (d/100)) {
            //Food Percent Increase
            changed_data.year2008.food.north[i] = changed_data.year2008.food.north[i] + (d / 100) * changed_data.year2008.food.north[i];
          }
          else {
            changed_data.year2008.food.north[i] = changed_data.year2008.food.north[i] - (d / 100) * changed_data.year2008.food.north[i];
          }
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2008.weight.north.length; i++) {
          changed_data.year2008.weight.north[i] = food_weight(d);
          if(changed_data.year2008.weight.north[i] < 10) {
            changed_data.year2008.weight.north[i] = 10;
          }
          if(changed_data.year2008.weight.north[i] > 25) {
            changed_data.year2008.weight.north[i] = 25;
          }
        }
        //population Changes
        changed_data.year2008.population.north = food_Population(d);
        //Stranding Changes
        changed_data.year2008.stranding.north = food_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2008.food.south = JSON.parse(JSON.stringify(data.year2008.food.south));
        changed_data.year2008.weight.south = JSON.parse(JSON.stringify(data.year2008.weight.south));
        changed_data.year2008.population.south = JSON.parse(JSON.stringify(data.year2008.population.south));
        changed_data.year2008.stranding.south = JSON.parse(JSON.stringify(data.year2008.stranding.south));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          var tmp = food_factor(changed_data.year2008.food.south[i]);
          if (tmp < (d/100)) {
            //Food Percent Increase
            changed_data.year2008.food.south[i] = changed_data.year2008.food.south[i] + (d / 100) * changed_data.year2008.food.south[i];
          }
          else {
            changed_data.year2008.food.south[i] = changed_data.year2008.food.south[i] - (d / 100) * changed_data.year2008.food.south[i];
          }
          if(changed_data.year2008.food.south[i] < foodMin) {
            changed_data.year2008.food.south[i] = foodMin;
          }
          if(changed_data.year2008.food.south[i] > foodMax) {
            changed_data.year2008.food.south[i] = foodMax;
          }
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2008.weight.south.length; i++) {
          changed_data.year2008.weight.south[i] = food_weight(d);
          if(changed_data.year2008.weight.south[i] < 10) {
            changed_data.year2008.weight.south[i] = 10;
          }
          if(changed_data.year2008.weight.south[i] > 25) {
            changed_data.year2008.weight.south[i] = 25;
          }
        }
        //population Changes
        changed_data.year2008.population.south = food_Population(d);
        //Stranding Changes
        changed_data.year2008.stranding.south = food_Stranding(d);
      }
      values = changed_data.year2008;
    }

    if (year === 2010) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2010.food.north = JSON.parse(JSON.stringify(data.year2010.food.north));
        changed_data.year2010.weight.north = JSON.parse(JSON.stringify(data.year2010.weight.north));
        changed_data.year2010.population.north = JSON.parse(JSON.stringify(data.year2010.population.north));
        changed_data.year2010.stranding.north = JSON.parse(JSON.stringify(data.year2010.stranding.north));
        //Food Changes
        for (var i = 0; i < 4; i++) {
          var tmp = food_factor(changed_data.year2010.food.north[i]);
          if (tmp < (d/100)) {
            //Food Percent Increase
            changed_data.year2010.food.north[i] = changed_data.year2010.food.north[i] + (d / 100) * changed_data.year2010.food.north[i];
          }
          else {
            changed_data.year2010.food.north[i] = changed_data.year2010.food.north[i] - (d / 100) * changed_data.year2010.food.north[i];
          }
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2010.weight.north.length; i++) {
          changed_data.year2010.weight.north[i] = food_weight(d);
          if(changed_data.year2010.weight.north[i] < 10) {
            changed_data.year2010.weight.north[i] = 10;
          }
          if(changed_data.year2010.weight.north[i] > 25) {
            changed_data.year2010.weight.north[i] = 25;
          }
        }
        //population Changes
        changed_data.year2010.population.north = food_Population(d);
        //Stranding Changes
        changed_data.year2010.stranding.north = food_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2010.food.south = JSON.parse(JSON.stringify(data.year2010.food.south));
        changed_data.year2010.weight.south = JSON.parse(JSON.stringify(data.year2010.weight.south));
        changed_data.year2010.population.south = JSON.parse(JSON.stringify(data.year2010.population.south));
        changed_data.year2010.stranding.south = JSON.parse(JSON.stringify(data.year2010.stranding.south));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          var tmp = food_factor(changed_data.year2010.food.south[i]);
          if (tmp < (d/100)) {
            //Food Percent Increase
            changed_data.year2010.food.south[i] = changed_data.year2010.food.south[i] + (d / 100) * changed_data.year2010.food.south[i];
          }
          else {
            changed_data.year2010.food.south[i] = changed_data.year2010.food.south[i] - (d / 100) * changed_data.year2010.food.south[i];
          }
          if(changed_data.year2010.food.south[i] < foodMin) {
            changed_data.year2010.food.south[i] = foodMin;
          }
          if(changed_data.year2010.food.south[i] > foodMax) {
            changed_data.year2010.food.south[i] = foodMax;
          }
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2010.weight.south.length; i++) {
          changed_data.year2010.weight.south[i] = food_weight(d);
          if(changed_data.year2010.weight.south[i] < 10) {
            changed_data.year2010.weight.south[i] = 10;
          }
          if(changed_data.year2010.weight.south[i] > 25) {
            changed_data.year2010.weight.south[i] = 25;
          }
        }
        //population Changes
        changed_data.year2010.population.south = food_Population(d);
        //Stranding Changes
        changed_data.year2010.stranding.south = food_Stranding(d);
      }
      values = changed_data.year2010;
    }

    if (year === 2013) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2013.food.north = JSON.parse(JSON.stringify(data.year2013.food.north));
        changed_data.year2013.weight.north = JSON.parse(JSON.stringify(data.year2013.weight.north));
        changed_data.year2013.population.north = JSON.parse(JSON.stringify(data.year2013.population.north));
        changed_data.year2013.stranding.north = JSON.parse(JSON.stringify(data.year2013.stranding.north));
        //Food Changes
        for (var i = 0; i < 4; i++) {
          var tmp = food_factor(changed_data.year2013.food.north[i]);
          if (tmp < (d/100)) {
            //Food Percent Increase
            changed_data.year2013.food.north[i] = changed_data.year2013.food.north[i] + (d / 100) * changed_data.year2013.food.north[i];
          }
          else {
            changed_data.year2013.food.north[i] = changed_data.year2013.food.north[i] - (d / 100) * changed_data.year2013.food.north[i];
          }
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2013.weight.north.length; i++) {
          changed_data.year2013.weight.north[i] = food_weight(d);
          if(changed_data.year2013.weight.north[i] < 10) {
            changed_data.year2013.weight.north[i] = 10;
          }
          if(changed_data.year2013.weight.north[i] > 25) {
            changed_data.year2013.weight.north[i] = 25;
          }
        }
        //population Changes
        changed_data.year2013.population.north = food_Population(d);
        //Stranding Changes
        changed_data.year2013.stranding.north = food_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2013.food.south = JSON.parse(JSON.stringify(data.year2013.food.south));
        changed_data.year2013.weight.south = JSON.parse(JSON.stringify(data.year2013.weight.south));
        changed_data.year2013.population.south = JSON.parse(JSON.stringify(data.year2013.population.south));
        changed_data.year2013.stranding.south = JSON.parse(JSON.stringify(data.year2013.stranding.south));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          var tmp = food_factor(changed_data.year2013.food.south[i]);
          if (tmp < (d/100)) {
            //Food Percent Increase
            changed_data.year2013.food.south[i] = changed_data.year2013.food.south[i] + (d / 100) * changed_data.year2013.food.south[i];
          }
          else {
            changed_data.year2013.food.south[i] = changed_data.year2013.food.south[i] - (d / 100) * changed_data.year2013.food.south[i];
          }
          if(changed_data.year2013.food.south[i] < foodMin) {
            changed_data.year2013.food.south[i] = foodMin;
          }
          if(changed_data.year2013.food.south[i] > foodMax) {
            changed_data.year2013.food.south[i] = foodMax;
          }
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2013.weight.south.length; i++) {
          changed_data.year2013.weight.south[i] = food_weight(d);
          if(changed_data.year2013.weight.south[i] < 10) {
            changed_data.year2013.weight.south[i] = 10;
          }
          if(changed_data.year2013.weight.south[i] > 25) {
            changed_data.year2013.weight.south[i] = 25;
          }
        }
        //population Changes
        changed_data.year2013.population.south = food_Population(d);
        //Stranding Changes
        changed_data.year2013.stranding.south = food_Stranding(d);
      }
      values = changed_data.year2013;
    }

    if (year === 2016) {
      if (pole === 'north') {
        //RESET LOGIC
        changed_data.year2016.food.north = JSON.parse(JSON.stringify(data.year2016.food.north));
        changed_data.year2016.weight.north = JSON.parse(JSON.stringify(data.year2016.weight.north));
        changed_data.year2016.population.north = JSON.parse(JSON.stringify(data.year2016.population.north));
        changed_data.year2016.stranding.north = JSON.parse(JSON.stringify(data.year2016.stranding.north));
        //Food Changes
        for (var i = 0; i < 4; i++) {
          var tmp = food_factor(changed_data.year2016.food.north[i]);
          if (tmp < (d/100)) {
            //Food Percent Increase
            changed_data.year2016.food.north[i] = changed_data.year2016.food.north[i] + (d / 100) * changed_data.year2016.food.north[i];
          }
          else {
            changed_data.year2016.food.north[i] = changed_data.year2016.food.north[i] - (d / 100) * changed_data.year2016.food.north[i];
          }
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2016.weight.north.length; i++) {
          changed_data.year2016.weight.north[i] = food_weight(d);
          if(changed_data.year2016.weight.north[i] < 10) {
            changed_data.year2016.weight.north[i] = 10;
          }
          if(changed_data.year2016.weight.north[i] > 25) {
            changed_data.year2016.weight.north[i] = 25;
          }
        }
        //population Changes
        changed_data.year2016.population.north = food_Population(d);
        //Stranding Changes
        changed_data.year2016.stranding.north = food_Stranding(d);
      }
      if (pole === 'south') {
        //RESET LOGIC
        changed_data.year2016.food.south = JSON.parse(JSON.stringify(data.year2016.food.south));
        changed_data.year2016.weight.south = JSON.parse(JSON.stringify(data.year2016.weight.south));
        changed_data.year2016.population.south = JSON.parse(JSON.stringify(data.year2016.population.south));
        changed_data.year2016.stranding.south = JSON.parse(JSON.stringify(data.year2016.stranding.south));

        //Food Changes
        for (var i = 0; i < 4; i++) {
          var tmp = food_factor(changed_data.year2016.food.south[i]);
          if (tmp < (d/100)) {
            //Food Percent Increase
            changed_data.year2016.food.south[i] = changed_data.year2016.food.south[i] + (d / 100) * changed_data.year2016.food.south[i];
          }
          else {
            changed_data.year2016.food.south[i] = changed_data.year2016.food.south[i] - (d / 100) * changed_data.year2016.food.south[i];
          }
          if(changed_data.year2016.food.south[i] < foodMin) {
            changed_data.year2016.food.south[i] = foodMin;
          }
          if(changed_data.year2016.food.south[i] > foodMax) {
            changed_data.year2016.food.south[i] = foodMax;
          }
        }
        //Weight Changes
        for (var i = 0; i < changed_data.year2016.weight.south.length; i++) {
          changed_data.year2016.weight.south[i] = food_weight(d);
          if(changed_data.year2016.weight.south[i] < 10) {
            changed_data.year2016.weight.south[i] = 10;
          }
          if(changed_data.year2016.weight.south[i] > 25) {
            changed_data.year2016.weight.south[i] = 25;
          }
        }
        //population Changes
        changed_data.year2016.population.south = food_Population(d);
        //Stranding Changes
        changed_data.year2016.stranding.south = food_Stranding(d);
      }
      values = changed_data.year2016;
    }

    food(values.food.north, values.food.south);
    foodEffects(values.food.north, values.food.south);
    weight(values.weight.north, values.weight.south);
    population(values.population.north, values.population.south);
    stranding(values.stranding.north, values.stranding.south);
  }

  function updateSliders(d) {
    var sum_n, sum_s;
    sum_n = 0;
    sum_s = 0;
    for (var i = 0; i < 4; i++) {
      sum_n = sum_n + d.food.north[i];
      sum_s = sum_s + d.food.south[i];
    }
    sum_n = sum_n / 4;
    sum_s = sum_s / 4;
    document.getElementById("food_range_n").value = food_percent(sum_n);
    slider_food_n_val = food_percent(sum_n);
    $('#food_val_n').val(parseFloat(slider_food_n_val).toFixed(0) + '%');

    document.getElementById("food_range_s").value = food_percent(sum_s);
    slider_food_s_val = food_percent(sum_s);
    $('#food_val_s').val(parseFloat(slider_food_s_val).toFixed(0) + '%');

    document.getElementById("oceanHeat_range_n").value = d.oceanHeat.north;
    $('#oceanheat_val_n').val(parseFloat(d.oceanHeat.north).toFixed(2) + ' X 10^22 J');

    document.getElementById("oceanHeat_range_s").value = d.oceanHeat.south;
    $('#oceanheat_val_s').val(parseFloat(d.oceanHeat.south).toFixed(2) + ' X 10^22 J');

    document.getElementById("seaLevel_range_n").value = d.seaLevel.north;
    $('#sealevel_val_n').val(parseFloat(d.seaLevel.north).toFixed(3) + ' m');

    document.getElementById("seaLevel_range_s").value = d.seaLevel.south;
    $('#sealevel_val_s').val(parseFloat(d.seaLevel.south).toFixed(3) + ' m');

    document.getElementById("co2_range_n").value = d.co2.north;
    $('#co2_val_n').val(d.co2.north + ' ppm');

    document.getElementById("co2_range_s").value = d.co2.south;
    $('#co2_val_s').val(d.co2.south + ' ppm');
  }

  function map(year) {
    changed_data = JSON.parse(JSON.stringify(data));
    YEAR = year;
    switch (year) {
      case 2008:
        var d = JSON.parse(JSON.stringify(data.year2008));
        updateSliders(d);
        food(d.food.north, d.food.south);
        oceanHeat(d.oceanHeat.north, d.oceanHeat.south);
        seaLevel(d.seaLevel.north, d.seaLevel.south);
        co2(d.co2.north, d.co2.south);
        foodEffects(d.food.north, d.food.south);
        weight(d.weight.north, d.weight.south);
        population(d.population.north, d.population.south);
        stranding(d.stranding.north, d.stranding.south);
      break;
      case 2010:
        var d = JSON.parse(JSON.stringify(data.year2010));
        updateSliders(d);
        food(d.food.north, d.food.south);
        oceanHeat(d.oceanHeat.north, d.oceanHeat.south);
        seaLevel(d.seaLevel.north, d.seaLevel.south);
        co2(d.co2.north, d.co2.south);
        foodEffects(d.food.north, d.food.south);
        weight(d.weight.north, d.weight.south);
        population(d.population.north, d.population.south);
        stranding(d.stranding.north, d.stranding.south);
      break;
      case 2013:
        var d = JSON.parse(JSON.stringify(data.year2013));
        updateSliders(d);
        food(d.food.north, d.food.south);
        oceanHeat(d.oceanHeat.north, d.oceanHeat.south);
        seaLevel(d.seaLevel.north, d.seaLevel.south);
        co2(d.co2.north, d.co2.south);
        foodEffects(d.food.north, d.food.south);
        weight(d.weight.north, d.weight.south);
        population(d.population.north, d.population.south);
        stranding(d.stranding.north, d.stranding.south);
      break;
      case 2016:
        var d = JSON.parse(JSON.stringify(data.year2016));
        updateSliders(d);
        food(d.food.north, d.food.south);
        oceanHeat(d.oceanHeat.north, d.oceanHeat.south);
        seaLevel(d.seaLevel.north, d.seaLevel.south);
        co2(d.co2.north, d.co2.south);
        foodEffects(d.food.north, d.food.south);
        weight(d.weight.north, d.weight.south);
        population(d.population.north, d.population.south);
        stranding(d.stranding.north, d.stranding.south);
      break;
    }
  }

  function drawCircles(group) {
    group.selectAll('circle')
    .exit()
    .remove();

    var array = [];
    for (var i = 50; i <= 250; i+=10) {
      array.push(i);
    }


    group.selectAll('circle')
    .data(array)
    .enter()
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', function (d) {
      return (d);
    })
    .attr('id', function (d) {
      if (d === 50 && group === group1) {
        return 'tooltip_area';
      }
    })
    .style('fill', 'none')
    .style('stroke', 'white')
    .attr("stroke-width", function (d) {
        if (d === 50 || d === 100 || d === 150 || d === 200 || d === 250) {
            return 0.6;
        }
        else {
            return 0.3;
        }
    })
  }

  function foodText(np, sp) {
    var p = Math.PI
    np = np.concat(sp.reverse());
    var out_radius = d3.scaleLinear()
                      .domain([foodMin, foodMax])
                      .range([210, 250]);  //210: Minimum factor should have some thickness, graph looks good
    var radians = [
      [(-p / 2), (-p / 4)],
      [(-p / 4), (0)],
      [(0), (p / 4)],
      [(p / 4), (p / 2)],
      [(-p / 2), (-3 * p / 4)],
      [(-3 * p / 4), -p],
      [p, (3 * p / 4)],
      [(3 * p / 4), (p / 2)]
    ];

    var data = ['Rockfish', 'Anchovy', 'Sardine', 'Mkt. Squid', 'Mkt. Squid', 'Sardine', 'Anchovy', 'Rockfish'];

    var pi = d3.pie()
  	.value(function (d) {
      return d;
    })(data);

    for (var i = 0; i < pi.length; i++) {
      pi[i].startAngle = radians[i][0];
      pi[i].endAngle = radians[i][1];
      pi[i].value = np[i];
    }

    var arcs = d3.arc()
          .innerRadius(200)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });


    var g = canvas.selectAll("arc")
    .data(pi)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + width / 4 + "," + height * .52 + ")");;

      if (document.getElementsByClassName('foodtext').length === 0) {
        group1.selectAll('path.foodtext')
        .data(np)
        .enter()
        .append('defs')
        .append('path')
        .attr('d', arcs)
        .attr('id', function (d, i) {
          return ('f' + i);
        })
        .attr("class", "foodtext");

        g.append("text")
        .attr('text-anchor', 'middle')
        .append("textPath")
        .attr('startOffset', '25%')
        .attr("xlink:href", function (d) {
            return ('#f'+d.index);
        })
        .text(function(d) { return d.data;})
        .style("fill", textColor)
        .style('font-size', textFontSize);
      }
  }

  function food(np, sp) {
    np = np.concat(sp.slice().reverse());
    var out_radius = d3.scaleLinear()
                      .domain([foodMin, foodMax])
                      .range([210, 250]);  //210: Minimum factor should have some thickness, graph looks good
    var radians = [
      [(-p / 2), (-p / 4)],
      [(-p / 4), (0)],
      [(0), (p / 4)],
      [(p / 4), (p / 2)],
      [(-p / 2), (-3 * p / 4)],
      [(-3 * p / 4), -p],
      [p, (3 * p / 4)],
      [(3 * p / 4), (p / 2)]
    ];

var defs= canvas.append('defs')
defs.append('pattern')
    .attr('id', 'rockfish')
    //.attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 1)
    .attr('height', 1)
  .append('svg:image')
    .attr('xlink:href', 'images/food-rockfish.jpg')
    .attr("x", 0)
    .attr("y", 0);

defs.append('pattern')
    .attr('id', 'anchovy')
    //.attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 1)
    .attr('height', 1)
  .append('svg:image')
    .attr('xlink:href', 'images/food-anchovy.jpg')
    .attr("x", 0)
    .attr("y", 0);

defs.append('pattern')
    .attr('id', 'sardine')
    //.attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 1)
    .attr('height', 1)
  .append('svg:image')
    .attr('xlink:href', 'images/food-sardine.jpg')
    .attr("x", 0)
    .attr("y", 0);

defs.append('pattern')
    .attr('id', 'mkt-squid')
    //.attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 1)
    .attr('height', 1)
  .append('svg:image')
    .attr('xlink:href', 'images/food-mkt-squid.jpg')
    .attr("x", 0)
    .attr("y", 0);


var foodimages = ['url(#rockfish)', 'url(#anchovy)', 'url(#sardine)', 'url(#mkt-squid)', 'url(#mkt-squid)', 'url(#sardine)', 'url(#anchovy)', 'url(#rockfish)'];

    var arcs = d3.arc()
          .innerRadius(200)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });
      if (document.getElementsByClassName('food').length === 0) {
        group1.selectAll('path.food')
        .data(np)
        .enter()
        .append('path')
        .attr('d', arcs)
        .attr("class", "food")
        .attr('fill', function (d, i) {
            return foodimages[i];
        });
      }
      else {
        group1.selectAll('path.food')
        .data(np)
        .transition()
        .duration(500)
        .attr('d', arcs)
        .attr("class", "food")
        .attr('fill', function (d, i) {
            return foodimages[i];
        });
      }
      foodText([3.2, 3.2, 3.2, 3.2], [3.8, 3.8, 3.8, 3.8]);
      drawCircles(group1);
  }

  function oceanHeatText(n, sp) {
    var p = Math.PI
    var np = [n, sp];
    var out_radius = d3.scaleLinear()
                      .domain([oceanHeatMin, oceanHeatMax])
                      .range([150, 200]);
    var radians = [
        [(-p / 2), (p / 2)],
        [(-p / 2), (-3 * p / 2)],
    ];

    var data = ['Ocean Heat', 'Ocean Heat'];

    var pi = d3.pie()
  	.value(function (d) {
      return d;
    })(data);

    for (var i = 0; i < pi.length; i++) {
      pi[i].startAngle = radians[i][0];
      pi[i].endAngle = radians[i][1];
      pi[i].value = np[i];
    }

    var arcs = d3.arc()
          .innerRadius(150)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });


    var g = canvas.selectAll("arc")
    .data(pi)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + width / 4 + "," + height * .52 + ")");;

      if (document.getElementsByClassName('oceanHeatText').length === 0) {
        group1.selectAll('path.oceanHeatText')
        .data(np)
        .enter()
        .append('defs')
        .append('path')
        .attr('d', arcs)
        .attr('id', function (d, i) {
          return ('oh' + i);
        })
        .attr("class", "oceanHeatText");

        g.append("text")
        .attr('text-anchor', 'middle')
        .append("textPath")
        .attr('startOffset', '25%')
        .attr("xlink:href", function (d) {
            return ('#oh'+d.index);
        })
        .text(function(d) {
          return d.data;
        })
        .style("fill", textColor)
        .style('font-size', textFontSize);
      }
  }

  function oceanHeat(n, sp) {
    var np = [n, sp];
    var out_radius = d3.scaleLinear()
                      .domain([oceanHeatMin, oceanHeatMax])
                      .range([151, 200]);
    var radians = [
      [(-p / 2), (p / 2)],
      [(p / 2), (3 * p / 2)],
    ];

    var defs= canvas.append('defs')
    defs.append('pattern')
        .attr('id', 'oceanheat')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/oceanheat.jpg')
        .attr("x", 0)
        .attr("y", 0);


    var arcs = d3.arc()
          .innerRadius(150)
          .outerRadius(function (d, i) {
            return out_radius(np[i])
          })
          .startAngle(function (d, i) {
            return radians[i][0]
          })
          .endAngle(function (d, i) {
            return radians[i][1]
          });
      if (document.getElementsByClassName('ocean-heat').length === 0) {
        group1.selectAll('path.ocean-heat')
        .data(np)
        .enter()
        .append('path')
        .attr('d', arcs)
        .attr("class", "ocean-heat")
        .attr('fill', 'url(#oceanheat)');
      }
      else {
        group1.selectAll('path.ocean-heat')
        .data(np)
        .transition()
        .duration(500)
        .attr('d', arcs)
        .attr("class", "ocean-heat")
        .attr('fill', 'url(#oceanheat)');
      }
      oceanHeatText(oceanHeatMax-3, oceanHeatMax-0.5);
      drawCircles(group1);
  }

  function seaLevelText(n, sp) {
    var p = Math.PI
    var np = [n, sp];
    var out_radius = d3.scaleLinear()
                      .domain([1, 10])
                      .range([100, 150]);
    var radians = [
        [(-p / 2), (p / 2)],
        [(-p / 2), (-3 * p / 2)],
    ];

    var data = ['Sea Level', 'Sea Level'];

    var pi = d3.pie()
  	.value(function (d) {
      return d;
    })(data);

    for (var i = 0; i < pi.length; i++) {
      pi[i].startAngle = radians[i][0];
      pi[i].endAngle = radians[i][1];
      pi[i].value = np[i];
    }

    var arcs = d3.arc()
          .innerRadius(100)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });


    var g = canvas.selectAll("arc")
    .data(pi)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + width / 4 + "," + height * .52 + ")");;

      if (document.getElementsByClassName('seaLevelText').length === 0) {
        group1.selectAll('path.seaLevelText')
        .data(np)
        .enter()
        .append('defs')
        .append('path')
        .attr('d', arcs)
        .attr('id', function (d, i) {
          return ('sl' + i);
        })
        .attr("class", "seaLevelText");

        g.append("text")
        .attr('text-anchor', 'middle')
        .append("textPath")
        .attr('startOffset', '25%')
        .attr("xlink:href", function (d) {
            return ('#sl'+d.index);
        })
        .text(function(d) {
          return d.data;
        })
        .style("fill", textColor)
        .style('font-size', textFontSize);
      }
  }

  function seaLevel(n, sp) {
    var np = [n, sp];
    var out_radius = d3.scaleLinear()
                      .domain([seaLevelMin, seaLevelMax])
                      .range([105, 150]); //105 because the arc should be visible for 0 sea level
    var radians = [
      [(-p / 2), (p / 2)],
      [(p / 2), (3 * p / 2)],
    ];

    var defs= canvas.append('defs')
    defs.append('pattern')
        .attr('id', 'sealevel')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/sealevel.jpg')
        .attr("x", 0)
        .attr("y", 0);

    var arcs = d3.arc()
          .innerRadius(100)
          .outerRadius(function (d, i) {
            return out_radius(np[i])
          })
          .startAngle(function (d, i) {
            return radians[i][0]
          })
          .endAngle(function (d, i) {
            return radians[i][1]
          });

      if (document.getElementsByClassName('sealevel').length === 0) {
        group1.selectAll('path.sealevel')
        .data(np)
        .enter()
        .append('path')
        .attr('d', arcs)
        .attr("class", "sealevel")
        .attr('fill', 'url(#sealevel)');
      }
      else {
        group1.selectAll('path.sealevel')
        .data(np)
        .transition()
        .duration(500)
        .attr('d', arcs)
        .attr("class", "sealevel")
        .attr('fill', 'url(#sealevel)');
      }
      seaLevelText(8.2, 9.5);
      drawCircles(group1);
  }

  function co2Text(n, sp) {
    var p = Math.PI
    var np = [n, sp];
    var out_radius = d3.scaleLinear()
                      .domain([1, 10])
                      .range([50, 100]);
    var radians = [
        [(-p / 2), (p / 2)],
        [(-p / 2), (-3 * p / 2)],
    ];

    var data = ['Carbon Dioxide', 'Carbon Dioxide'];

    var pi = d3.pie()
  	.value(function (d) {
      return d;
    })(data);

    for (var i = 0; i < pi.length; i++) {
      pi[i].startAngle = radians[i][0];
      pi[i].endAngle = radians[i][1];
      pi[i].value = np[i];
    }

    var arcs = d3.arc()
          .innerRadius(50)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });


    var g = canvas.selectAll("arc")
    .data(pi)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + width / 4 + "," + height * .52 + ")");;

      if (document.getElementsByClassName('co2Text').length === 0) {
        group1.selectAll('path.co2Text')
        .data(np)
        .enter()
        .append('defs')
        .append('path')
        .attr('d', arcs)
        .attr('id', function (d, i) {
          return ('co' + i);
        })
        .attr("class", "co2Text");

        g.append("text")
        .attr('text-anchor', 'middle')
        .append("textPath")
        .attr('startOffset', '25%')
        .attr("xlink:href", function (d) {
            return ('#co'+d.index);
        })
        .text(function(d) {
          return d.data;
        })
        .style("fill", textColor)
        .style('font-size', textFontSize);
      }
  }

  function co2(n, sp) {
    var np = [n, sp];
    var out_radius = d3.scaleLinear()
                      .domain([co2Min, co2Max])
                      .range([50, 100]);
    var radians = [
      [(-p / 2), (p / 2)],
      [(p / 2), (3 * p / 2)],
    ];

    var defs= canvas.append('defs')
    defs.append('pattern')
        .attr('id', 'carbon-dioxide')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/carbon-dioxide.jpg')
        .attr("x", 0)
        .attr("y", 0);

    var arcs = d3.arc()
          .innerRadius(0)
          .outerRadius(function (d, i) {
            return out_radius(np[i])
          })
          .startAngle(function(d,i) {
            return radians[i][0]
          })
          .endAngle(function (d, i) {
            return radians[i][1]
          });
      if (document.getElementsByClassName('co2').length === 0) {
        group1.selectAll('path.co2')
        .data(np)
        .enter()
        .append('path')
        .attr('d', arcs)
        .attr("class", "co2")
        .attr('fill', 'url(#carbon-dioxide)');
      }
      else {
        group1.selectAll('path.co2')
        .data(np)
        .transition()
        .duration(500)
        .attr('d', arcs)
        .attr("class", "co2")
        .attr('fill', 'url(#carbon-dioxide)');
      }
      co2Text(8.2, 9.5)
      drawCircles(group1);
  }

  function foodEffectText(np, sp) {
    var p = Math.PI
    np = np.concat(sp.reverse());
    var out_radius = d3.scaleLinear()
                      .domain([foodMin, foodMax])
                      .range([210, 250]);  //210: Minimum factor should have some thickness, graph looks good
    var radians = [
      [(-p / 2), (-p / 4)],
      [(-p / 4), (0)],
      [(0), (p / 4)],
      [(p / 4), (p / 2)],
      [(-p / 2), (-3 * p / 4)],
      [(-3 * p / 4), -p],
      [p, (3 * p / 4)],
      [(3 * p / 4), (p / 2)]
    ];

    var data = ['Rockfish', 'Anchovy', 'Sardine', 'Mkt. Squid', 'Mkt. Squid', 'Sardine', 'Anchovy', 'Rockfish'];

    var pi = d3.pie()
  	.value(function (d) {
      return d;
    })(data);

    for (var i = 0; i < pi.length; i++) {
      pi[i].startAngle = radians[i][0];
      pi[i].endAngle = radians[i][1];
      pi[i].value = np[i];
    }

    var arcs = d3.arc()
          .innerRadius(200)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });


    var g = canvas.selectAll("arc")
    .data(pi)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + (width - (width / 4)) + "," + height * .52 + ")");

      if (document.getElementsByClassName('foodeffecttext').length === 0) {
        group1.selectAll('path.foodeffecttext')
        .data(np)
        .enter()
        .append('defs')
        .append('path')
        .attr('d', arcs)
        .attr('id', function (d, i) {
          return ('f' + i);
        })
        .attr("class", "foodeffecttext");

        g.append("text")
        .attr('text-anchor', 'middle')
        .append("textPath")
        .attr('startOffset', '25%')
        .attr("xlink:href", function (d) {
            return ('#f'+d.index);
        })
        .text(function(d) { return d.data;})
        .style("fill", textColor)
        .style('font-size', textFontSize);
      }
  }

  function foodEffects(np, sp) {
    np = sp.concat(np.slice().reverse());
    var out_radius = d3.scaleLinear()
                      .domain([foodMin, foodMax])
                      .range([210, 250]); //210: Minimum factor should have some thickness, graph looks good
    var radians = [
      [(-p / 2), (-p / 4)],
      [(-p / 4), (0)],
      [(0), (p / 4)],
      [(p / 4), (p / 2)],
      [(-p / 2), (-3 * p / 4)],
      [(-3 * p / 4), -p],
      [p, (3 * p / 4)],
      [(3 * p / 4), (p / 2)]
    ];

    var defs= canvas.append('defs')
    defs.append('pattern')
        .attr('id', 'rockfish')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/food-rockfish.jpg')
        .attr("x", 0)
        .attr("y", 0);

    defs.append('pattern')
        .attr('id', 'anchovy')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/food-anchovy.jpg')
        .attr("x", 0)
        .attr("y", 0);

    defs.append('pattern')
        .attr('id', 'sardine')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/food-sardine.jpg')
        .attr("x", 0)
        .attr("y", 0);

    defs.append('pattern')
        .attr('id', 'mkt-squid')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/food-mkt-squid.jpg')
        .attr("x", 0)
        .attr("y", 0);

    var foodimages = ['url(#rockfish)', 'url(#anchovy)', 'url(#sardine)', 'url(#mkt-squid)', 'url(#mkt-squid)', 'url(#sardine)', 'url(#anchovy)', 'url(#rockfish)'];

    var arcs = d3.arc()
          .innerRadius(200)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });
      if (document.getElementsByClassName('foodEffects').length === 0) {
        group2.selectAll('path.foodEffects')
        .data(np)
        .enter()
        .append('path')
        .attr('d', arcs)
        .attr("class", "foodEffects")
        .attr('fill', function (d, i) {
            return foodimages[i];
        });
      }
      else {
        group2.selectAll('path.foodEffects')
        .data(np)
        .transition()
        .duration(500)
        .attr('d', arcs)
        .attr("class", "foodEffects")
        .attr('fill', function (d, i) {
            return foodimages[i];
        });
      }
      foodEffectText([3, 3, 3, 3], [3.8, 3.8, 3.8, 3.8]);
      drawCircles(group2);
  }

  function weightText(np, sp) {
    var p = Math.PI
    np = np.concat(sp.reverse());
    var out_radius = d3.scaleLinear()
                      .domain([1, 10])
                      .range([150, 200]);  //210: Minimum factor should have some thickness, graph looks good
    var radians = [
      [(-p / 2), (0)],
      [(0), (p / 2)],
      [(-p / 2), -p],
      [-p , (-3 * p / 2)]
    ];

    var data = ['Weight (Female)', 'Weight (Male)', 'Weight (Male)', 'Weight (Female)'];

    var pi = d3.pie()
  	.value(function (d) {
      return d;
    })(data);

    for (var i = 0; i < pi.length; i++) {
      pi[i].startAngle = radians[i][0];
      pi[i].endAngle = radians[i][1];
      pi[i].value = np[i];
    }

    var arcs = d3.arc()
          .innerRadius(150)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });


    var g = canvas.selectAll("arc")
    .data(pi)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + (width - (width / 4)) + "," + height * .52 + ")");

      if (document.getElementsByClassName('weighttext').length === 0) {
        group1.selectAll('path.weighttext')
        .data(np)
        .enter()
        .append('defs')
        .append('path')
        .attr('d', arcs)
        .attr('id', function (d, i) {
          return ('wt' + i);
        })
        .attr("class", "weighttext");

        g.append("text")
        .attr('text-anchor', 'middle')
        .append("textPath")
        .attr('startOffset', '25%')
        .attr("xlink:href", function (d) {
            return ('#wt'+d.index);
        })
        .text(function(d) { return d.data;})
        .style("fill", textColor)
        .style('font-size', textFontSize);
      }
  }

  function weight(np, sp) {
    np = sp.concat(np);
    var out_radius = d3.scaleLinear()
                      .domain([weightMin, weightMax])
                      .range([160, 200]);
    var radians = [
      [(-p / 2), (0)],
      [(0), (p / 2)],
      [(p / 2), p],
      [p , (3 * p / 2)]
    ];


        var defs= canvas.append('defs')
        defs.append('pattern')
            .attr('id', 'wt-male')
            //.attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 1)
            .attr('height', 1)
          .append('svg:image')
            .attr('xlink:href', 'images/wt-male.jpg')
            .attr("x", 0)
            .attr("y", 0);

        defs.append('pattern')
            .attr('id', 'wt-female')
            //.attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 1)
            .attr('height', 1)
          .append('svg:image')
            .attr('xlink:href', 'images/wt-female.jpg')
            .attr("x", 0)
            .attr("y", 0);
    var weightimages = ['url(#wt-female)', 'url(#wt-male)', 'url(#wt-female)', 'url(#wt-male)'];


    var arcs = d3.arc()
          .innerRadius(150)
          .outerRadius(function(d,i) {
            return out_radius(np[i])
          })
          .startAngle(function(d,i) {
            return radians[i][0]
          })
          .endAngle(function(d, i) {
            return radians[i][1]
          });

      if (document.getElementsByClassName('weight').length === 0) {
        group2.selectAll('path.weight')
        .data(np)
        .enter()
        .append('path')
        .attr('d', arcs)
        .attr("class", "weight")
        .attr('fill', function (d, i) {
            return weightimages[i];
        });
      }
      else {
        group2.selectAll('path.weight')
        .data(np)
        .transition()
        .duration(500)
        .attr('d', arcs)
        .attr("class", "weight")
        .attr('fill', function (d, i) {
            return weightimages[i];
        });
      }
      weightText([8, 8], [9, 9])
      drawCircles(group2);
  }

  function populationText(n, sp) {
    var p = Math.PI
    var np = [n, sp];
    var out_radius = d3.scaleLinear()
                      .domain([1, 10])
                      .range([100, 150]);
    var radians = [
        [(-p / 2), (p / 2)],
        [(-p / 2), (-3 * p / 2)],
    ];

    var data = ["Population", "Population"];

    var pi = d3.pie()
  	.value(function (d) {
      return d;
    })(data);

    for (var i = 0; i < pi.length; i++) {
      pi[i].startAngle = radians[i][0];
      pi[i].endAngle = radians[i][1];
      pi[i].value = np[i];
    }

    var arcs = d3.arc()
          .innerRadius(100)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });


    var g = canvas.selectAll("arc")
    .data(pi)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + (width - (width / 4)) + "," + height * .52 + ")");

      if (document.getElementsByClassName('populationText').length === 0) {
        group1.selectAll('path.populationText')
        .data(np)
        .enter()
        .append('defs')
        .append('path')
        .attr('d', arcs)
        .attr('id', function (d, i) {
          return ('pl' + i);
        })
        .attr("class", "populationText");

        g.append("text")
        .attr('text-anchor', 'middle')
        .append("textPath")
        .attr('startOffset', '25%')
        .attr("xlink:href", function (d) {
            return ('#pl'+d.index);
        })
        .text(function(d) {
          return d.data;
        })
        .style("fill", textColor)
        .style('font-size', textFontSize);
      }
  }

  function population(n, sp) {
    var np = [sp, n];
    var out_radius = d3.scaleLinear()
                      .domain([populationMin, populationMax])
                      .range([115, 150]);
    var radians = [
      [(-p / 2), (p / 2)],
      [(p / 2), (3 * p / 2)],
    ];

    var defs= canvas.append('defs')
    defs.append('pattern')
        .attr('id', 'population')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/population.jpg')
        .attr("x", 0)
        .attr("y", 0);

    var arcs = d3.arc()
          .innerRadius(100)
          .outerRadius(function (d, i) {
            return out_radius(np[i])
          })
          .startAngle(function (d, i) {
            return radians[i][0]
          })
          .endAngle(function (d, i) {
            return radians[i][1]
          });

      if (document.getElementsByClassName('population').length === 0) {
        group2.selectAll('path.population')
        .data(np)
        .enter()
        .append('path')
        .attr('d', arcs)
        .attr("class", "population")
        .attr('fill', 'url(#population)');
      }
      else {
        group2.selectAll('path.population')
        .data(np)
        .transition()
        .duration(500)
        .attr('d', arcs)
        .attr("class", "population")
        .attr('fill', 'url(#population)');
      }
      populationText(8.2, 9.5);
      drawCircles(group2);
  }

  function strandingText(n, sp) {
    var p = Math.PI
    var np = [n, sp];
    var out_radius = d3.scaleLinear()
                      .domain([1, 10])
                      .range([50, 100]);
    var radians = [
        [(-p / 2), (p / 2)],
        [(-p / 2), (-3 * p / 2)],
    ];

    var data = ['Sea Lion Stranding', 'Sea Lion Stranding'];

    var pi = d3.pie()
  	.value(function (d) {
      return d;
    })(data);

    for (var i = 0; i < pi.length; i++) {
      pi[i].startAngle = radians[i][0];
      pi[i].endAngle = radians[i][1];
      pi[i].value = np[i];
    }

    var arcs = d3.arc()
          .innerRadius(50)
          .outerRadius(function (d, i) {
            return out_radius(np[i]);
          })
          .startAngle(function (d, i) {
            return radians[i][0];
          })
          .endAngle(function (d, i)
          {
            return radians[i][1];
          });


    var g = canvas.selectAll("arc")
    .data(pi)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + (width - (width / 4)) + "," + height * .52 + ")");

      if (document.getElementsByClassName('strandingText').length === 0) {
        group1.selectAll('path.strandingText')
        .data(np)
        .enter()
        .append('defs')
        .append('path')
        .attr('d', arcs)
        .attr('id', function (d, i) {
          return ('st' + i);
        })
        .attr("class", "strandingText");

        g.append("text")
        .attr('text-anchor', 'middle')
        .append("textPath")
        .attr('startOffset', '25%')
        .attr("xlink:href", function (d) {
            return ('#st'+d.index);
        })
        .text(function(d) {
          return d.data;
        })
        .style("fill", textColor)
        .style('font-size', textFontSize);
      }
  }

  function stranding(n, sp) {
    var np = [sp, n];
    var out_radius = d3.scaleLinear()
                      .domain([strandingMin, strandingMax])
                      .range([50, 100]);
    var radians = [
      [(-p / 2), (p / 2)],
      [(p / 2), (3 * p / 2)],
    ];

    var defs= canvas.append('defs')
    defs.append('pattern')
        .attr('id', 'stranding')
        //.attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 1)
        .attr('height', 1)
      .append('svg:image')
        .attr('xlink:href', 'images/stranding.jpg')
        .attr("x", 0)
        .attr("y", 0);

    var arcs = d3.arc()
          .innerRadius(0)
          .outerRadius(function (d, i) {
            return out_radius(np[i])
          })
          .startAngle(function(d,i) {
            return radians[i][0]
          })
          .endAngle(function (d, i) {
            return radians[i][1]
          });

      if (document.getElementsByClassName('stranding').length === 0) {
        group2.selectAll('path.stranding')
        .data(np)
        .enter()
        .append('path')
        .attr('d', arcs)
        .attr("class", "stranding")
        .attr('fill', 'url(#stranding)');
      }
      else {
        group2.selectAll('path.stranding')
        .data(np)
        .transition()
        .duration(500)
        .attr('d', arcs)
        .attr("class", "stranding")
        .attr('fill', 'url(#stranding)');
      }
      strandingText(8.2, 9.5);
      drawCircles(group2);
  }
