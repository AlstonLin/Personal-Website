var fields = {
  "web" : "Web",
  "mobile" : "Mobile",
  "concurrent" : "Concurrent Programming",
  "structures" : "Data Structures",
  "design" : "Design Patterns",
  "graphics" : "3D Graphics",
  "graph" : "Graph Theory",
  "algorithms" : "Algorithms",
  "databases" : "Databases"
};
var languages = {
  "android" : "Android",
  "javascript" : "Javascript",
  "html" : "HTML / CSS",
  "java" : "Java",
  "cpp" : "C++",
  "rails" : "Ruby on Rails",
  "node" : "Node.js",
  "bootstrap" : "Bootstrap",
  "meteor" : "Meteor.js"
};

function addClearFix(shownProjects){
  //Removes old
  $('.clearfix').remove();
  //Adds new
  var i = 0;
  for (var key in shownProjects){
    if ((i + 1) % 2 == 0){
      shownProjects[key].div.after('<div class="clearfix hidden-md-block"></div>');
    }
    i++;
  }
}

$(document).ready(function (){
  //Defines the projects
  var projects = {
    "calculall": {
      name: "calculall",
      div: $("#calculall"),
      fields: ["mobile", "design", "structures", "concurrent", "algorithms"],
      languages: ["java", "android"]
    },
    "muriqui" : {
      name: "muriqui",
      div: $("#muriqui"),
      fields: ["web", "databases"],
      languages: ["javascript", "html", "rails", "bootstrap"]
    },
    "polarfeed" : {
      name: "polarfeed",
      div: $("#polarfeed"),
      fields: ["mobile", "web", "databases"],
      languages: ["java", "android", "node"]
    },
    "war": {
      name: "war",
      div: $("#war"),
      fields: ["graph", "design", "algorithms", "structures"],
      languages: ["java"]
    },
    "block-survival": {
      name: "block-survival",
      div: $("#block-survival"),
      fields: ["graphics", "design", "algorithms", "structures", "concurrent"],
      languages: ["java"]
    },
    "3draw" : {
      name: "3draw",
      div: $("#3draw"),
      fields: ["web", "graphics", "databases"],
      languages: ["javascript", "html", "node", "bootstrap"]
    },
    "fuser": {
      name: "fuser",
      div: $("#fuser"),
      fields: ["mobile", "databases"],
      languages: ["java", "android"]
    },
    "organizer": {
      name: "organizer",
      div: $("#organizer"),
      fields: ["web", "databases"],
      languages: ["javascript", "html", "meteor", "bootstrap"]
    },
    "lost" : {
      name: "lost",
      div: $("#lost"),
      fields: ["mobile", "graph", "design", "structures"],
      languages: ["java", "android", "cpp"]
    },
    "troll" : {
      name: "troll",
      div: $("#troll"),
      fields: ["mobile", "web", "databases"],
      languages: ["java", "android"]
    }
  };

  //All Filter
  $("#all-languages").click(function(e){
    e.preventDefault();
    for (var key in projects){
      var project = projects[key];
      project.div.show("slow");
      addClearFix(projects);
    }
  });

  $("#all-fields").click(function(e){
    e.preventDefault();
    for (var key in projects){
      var project = projects[key];
      project.div.show("slow");
      addClearFix(projects);
    }
  });

  //Adds the filters at the top + onclicks
  for (var languageKey in languages){
    var language = languages[languageKey];
    $("#filter-language").append(
      "<button id=\"" + languageKey + "-language\" class=\"filter-language btn\">"
      + "<h3 class=\"filter-title\">" + language + "</h3>"
      + "</button>"
    );

    $("#" + languageKey + "-language").click(function(key){
        return function(e){
          e.preventDefault();
          var shown = {};
          for (var projectKey in projects){
            var project = projects[projectKey];
            if (project.languages.indexOf(key) == -1){ //Does not have the tag
              project.div.hide("slow");
            } else{
              project.div.show("slow");
              shown[projectKey] = project;
            }
          }
          addClearFix(shown);
        }
      }(languageKey)
    );
  }

  for (var fieldKey in fields){
    var field = fields[fieldKey];
    $("#filter-field").append(
      "<button id=\"" + fieldKey + "-field\" class=\"filter-field btn\">"
      + "<h3 class=\"filter-title\">" + field + "</h3>"
      + "</button>"
    );

    $("#" + fieldKey + "-field").click(function(key){
        return function(e){
          e.preventDefault();
          var shown = {};
          for (var projectKey in projects){
            var project = projects[projectKey];
            if (project.fields.indexOf(key) == -1){ //Does not have the tag
              project.div.hide("slow");
            } else{
              project.div.show("slow");
              var project = projects[projectKey];
            }
          }
          addClearFix(shown);
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

  addClearFix(projects);
});
