var fields = {
  "web" : "Web",
  "mobile" : "Mobile",
  "concurrent" : "Concurrent Programming",
  "distributed" : "Distributed Systems",
  "structures" : "Data Structures",
  "design" : "Design Patterns",
  "graphics" : "3D Graphics",
  "graph" : "Graph Theory"
}
var languages = {
  "android" : "Android",
  "javascript" : "Javascript",
  "java" : "Java",
  "bootstrap" : "Bootstrap",
  "meteor" : "Meteor.js"
}

$(document).ready(function (){
  //Defines the projects
  var projects = {
    "calculall": {
      name: "calculall",
      div: $("#calculall"),
      fields: ["mobile", "concurrent", "design", "structures"],
      languages: ["android", "java"]
    },
    "block-survival": {
      name: "block-survival",
      div: $("#block-survival"),
      fields: ["concurrent", "design", "graphics", "structures"],
      languages: ["java"]
    },
    "fuser": {
      name: "fuser",
      div: $("#fuser"),
      fields: ["mobile", "distributed"],
      languages: ["android", "java"]
    },
    "war": {
      name: "war",
      div: $("#war"),
      fields: ["distributed", "structures", "graph"],
      languages: ["java"]
    },
    "organizer": {
      name: "organizer",
      div: $("#organizer"),
      fields: ["web", "distributed"],
      languages: ["javascript", "bootstrap", "meteor"]
    }
  };

  //All Filter
  $("#all-languages").click(function(e){
    e.preventDefault();
    for (var key in projects){
      var project = projects[key];
      project.div.show("slow");
    }
  });

  $("#all-fields").click(function(e){
    e.preventDefault();
    for (var key in projects){
      var project = projects[key];
      project.div.show("slow");
    }
  });

  //Adds the filters at the top + onclicks
  for (var languageKey in languages){
    var language = languages[languageKey];
    $("#filter-language").append(
      "<button id=\"" + languageKey + "-language\" class=\"filter-language\">"
      + "<h3 class=\"filter-title\">" + language + "</h3>"
      + "</button>"
    );

    $("#" + languageKey + "-language").click(function(key){
        return function(e){
          e.preventDefault();
          for (var projectKey in projects){
            var project = projects[projectKey];
            if (project.languages.indexOf(key) == -1){ //Does not have the tag
              project.div.hide("slow");
            } else{
              project.div.show("slow");
            }
          }
        }
      }(languageKey)
    ); 
  }

  for (var fieldKey in fields){
    var field = fields[fieldKey];
    $("#filter-field").append(
      "<button id=\"" + fieldKey + "-field\" class=\"filter-field\">"
      + "<h3 class=\"filter-title\">" + field + "</h3>"
      + "</button>"
    );

    $("#" + fieldKey + "-field").click(function(key){
        return function(e){
          e.preventDefault();
          for (var projectKey in projects){
            var project = projects[projectKey];
            if (project.fields.indexOf(key) == -1){ //Does not have the tag
              project.div.hide("slow");
            } else{
              project.div.show("slow");
            }
          }
        }
      }(fieldKey)
    ); 
  }

  //Adds the tags to each project
  for (var key in projects){
    var project = projects[key];
    for (var i in project.languages){
       $("#" + project.name + "-tags-languages").append(
       "<div class=\"tag-language\">"
        + languages[project.languages[i]]
        + "</div>"  
      );
    }
    for (var i in project.fields){
       $("#" + project.name + "-tags-fields").append(
       "<div class=\"tag-field\">"
        + fields[project.fields[i]]
        + "</div>"
      );
    }
  }
});