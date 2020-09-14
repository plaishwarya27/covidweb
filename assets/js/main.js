!(function ($) {
  "use strict";

  // Hero typed
  if ($(".typed").length) {
    var typed_strings = $(".typed").data("typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on("click", ".nav-menu a, .scrollto", function (e) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {
        var scrollto = target.offset().top;

        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu, .mobile-nav").length) {
          $(".nav-menu .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  $(document).on("click", ".mobile-nav-toggle", function (e) {
    $("body").toggleClass("mobile-nav-active");
    $(".mobile-nav-toggle i").toggleClass(
      "icofont-navigation-menu icofont-close"
    );
  });

  $(document).click(function (e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("mobile-nav-active")) {
        $("body").removeClass("mobile-nav-active");
        $(".mobile-nav-toggle i").toggleClass(
          "icofont-navigation-menu icofont-close"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // countries section
  $(".countries-content").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    {
      offset: "80%",
    }
  );

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);

$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/contacts",
  datatype: "html",
  data: {},
  success: function (response) {
    response["data"]["contacts"]["regional"].sort(function (a, b) {
      return a.loc < b.loc ? -1 : a.loc > b.loc ? 1 : 0;
    });
    var card = document.getElementById("contacttable");
    for (var i in response["data"]["contacts"]["regional"]) {
      var rows = document.createElement("tr");
      var loc = document.createElement("td");
      var no = document.createElement("td");
      no.classList.add("px-5");
      var location = document.createTextNode(
        response["data"]["contacts"]["regional"][i].loc
      );
      loc.appendChild(location);
      var anchor = document.createElement("a");
      anchor.href = "tel:" + response["data"]["contacts"]["regional"][i].number;
      var number = document.createTextNode(
        response["data"]["contacts"]["regional"][i].number
      );
      anchor.appendChild(number);
      no.appendChild(anchor);
      rows.appendChild(loc);
      rows.appendChild(no);
      card.appendChild(rows);
    }
    card.classList.remove("d-none");
  },
  error: function (error) {},
});

$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/notifications",
  datatype: "html",
  data: {},
  success: function (response) {
    var card = document.getElementById("nottable");
    for (var i in response["data"]["notifications"]) {
      var rows = document.createElement("tr");
      var loc = document.createElement("td");
      var no = document.createElement("td");
      no.classList.add("px-5");
      var location = document.createTextNode(
        response["data"]["notifications"][i].title
      );
      loc.appendChild(location);
      var anchor = document.createElement("a");
      anchor.href = response["data"]["notifications"][i].link;
      anchor.target = "_blank";
      var number = document.createTextNode(
        response["data"]["notifications"][i].link
      );
      anchor.appendChild(number);
      no.appendChild(anchor);
      rows.appendChild(loc);
      rows.appendChild(no);
      card.appendChild(rows);
    }
    card.classList.remove("d-none");
  },
  error: function (error) {},
});

$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/hospitals/beds",
  datatype: "html",
  data: {},
  success: function (response) {
    response["data"]["regional"].sort(function (a, b) {
      return a.state < b.state ? -1 : a.state > b.state ? 1 : 0;
    });
    var table = document.getElementById("hostable");
    for (var i in response["data"]["regional"]) {
      if (response["data"]["regional"][i].state != "INDIA") {
        var row = document.createElement("tr");
        var state = document.createElement("td");
        var rh = document.createElement("td");
        var rb = document.createElement("td");
        var uh = document.createElement("td");
        var ub = document.createElement("td");
        var th = document.createElement("td");
        var tb = document.createElement("td");
        var stateTextNode = document.createTextNode(
          response["data"]["regional"][i].state
        );
        state.appendChild(stateTextNode);
        var rhTextNode = document.createTextNode(
          response["data"]["regional"][i].ruralHospitals
        );
        rh.appendChild(rhTextNode);
        var rbTextNode = document.createTextNode(
          response["data"]["regional"][i].ruralBeds
        );
        rb.appendChild(rbTextNode);
        var uhTextNode = document.createTextNode(
          response["data"]["regional"][i].urbanHospitals
        );
        uh.appendChild(uhTextNode);
        var ubTextNode = document.createTextNode(
          response["data"]["regional"][i].urbanBeds
        );
        ub.appendChild(ubTextNode);
        var thTextNode = document.createTextNode(
          response["data"]["regional"][i].totalHospitals
        );
        th.appendChild(thTextNode);
        var tbTextNode = document.createTextNode(
          response["data"]["regional"][i].totalBeds
        );
        tb.appendChild(tbTextNode);
        row.appendChild(state);
        row.appendChild(rh);
        row.appendChild(rb);
        row.appendChild(uh);
        row.appendChild(ub);
        row.appendChild(th);
        row.appendChild(tb);
        table.appendChild(row);
      }
    }
  },
  error: function (error) {},
});

$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/hospitals/medical-colleges",
  datatype: "html",
  data: {},
  success: function (response) {
    var stateval = $("#listofstate").val();
    var ownerval = $("#listofowner").val();
    var medtable = document.getElementById("medtable");
    medtable.innerHTML = "";

    var rowhead = document.createElement("tr");
    rowhead.classList.add("table-header", "hos-header");
    var statehead = document.createElement("td");
    var namehead = document.createElement("td");
    var cityhead = document.createElement("td");
    var ownerhead = document.createElement("td");
    var capacityhead = document.createElement("td");
    var bedshead = document.createElement("td");
    var stateheadTextNode = document.createTextNode("State Name");
    statehead.appendChild(stateheadTextNode);
    var nameheadTextNode = document.createTextNode("Name");
    namehead.appendChild(nameheadTextNode);
    var cityheadTextNode = document.createTextNode("City");
    cityhead.appendChild(cityheadTextNode);
    var ownerheadTextNode = document.createTextNode("Owner Type");
    ownerhead.appendChild(ownerheadTextNode);
    var capacityheadTextNode = document.createTextNode("Admission Capacity");
    capacityhead.appendChild(capacityheadTextNode);
    var bedheadTextNode = document.createTextNode("Hospital Beds");
    bedshead.appendChild(bedheadTextNode);

    rowhead.appendChild(statehead);
    rowhead.appendChild(namehead);
    rowhead.appendChild(cityhead);
    rowhead.appendChild(ownerhead);
    rowhead.appendChild(capacityhead);
    rowhead.appendChild(bedshead);
    medtable.appendChild(rowhead);

    for (var i in response["data"]["medicalColleges"]) {
      var row = document.createElement("tr");
      var state = document.createElement("td");
      var name = document.createElement("td");
      var city = document.createElement("td");
      var ownership = document.createElement("td");
      var capacity = document.createElement("td");
      var beds = document.createElement("td");
      var stateTextNode = document.createTextNode(
        response["data"]["medicalColleges"][i].state
      );
      state.appendChild(stateTextNode);
      var nameTextNode = document.createTextNode(
        response["data"]["medicalColleges"][i].name
      );
      name.appendChild(nameTextNode);
      var cityTextNode = document.createTextNode(
        response["data"]["medicalColleges"][i].city
      );
      city.appendChild(cityTextNode);
      var ownerTextNode = document.createTextNode(
        response["data"]["medicalColleges"][i].ownership
      );
      ownership.appendChild(ownerTextNode);
      var capacityTextNode = document.createTextNode(
        response["data"]["medicalColleges"][i].admissionCapacity
      );
      capacity.appendChild(capacityTextNode);
      var bedTextNode = document.createTextNode(
        response["data"]["medicalColleges"][i].hospitalBeds
      );
      beds.appendChild(bedTextNode);

      row.appendChild(state);
      row.appendChild(name);
      row.appendChild(city);
      row.appendChild(ownership);
      row.appendChild(capacity);
      row.appendChild(beds);
      medtable.appendChild(row);
    }
    document.getElementById("medtable").classList.remove("d-none");
  },
  error: function (error) {},
});
