/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* A test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */

    it('contain URLs', function() {
      // Iterate through all feeds and chech that they have a URL
      for (const feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe("");
      }
    });


    /* A test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */

    it('have names', function() {
      // Iterate through all feed and check that they have a name
      for (const feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe("");
      }
    });
  });


  /* A new test suite named "The menu" */

  describe("The menu", function() {
    const menuIcon = $('.menu-icon-link');

    /* A test that ensures the menu element is
    * hidden by default.
    */

    it('should be hidden by default', function() {
      // We expect the body to initially contain the class that hides the menu
      expect($('body').hasClass("menu-hidden")).toEqual(true);
    });

    /* A test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */

    it('should change visibility when clicked', function() {
      menuIcon.click();
      expect($('body').hasClass("menu-hidden")).toEqual(false);
      // after first click expect menu to show
      menuIcon.click();
      expect($('body').hasClass("menu-hidden")).toEqual(true);
      // After second click expect menu to hide
    });
  });

  /* A new test suite named "Initial Entries" */

  describe('Initial Entries', function() {
    const feedContainer = $(".feed");
    beforeEach(function(done) {
      // Before the test, run the loadFeed function and wait for it to complete before continuing
      loadFeed(0, function() {
        done();
      });
    });

    /* A test that ensures when the loadFeed
    * function is called and completes it's work, there is at least
    * a single .entry element within the .feed container.
    * loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */

    it("At least one entry should exist after loadFeed functions has been called", function(done) {
      let entries = feedContainer.find(".entry");
      // Find all descendants of the feed container that have the "entry" class
      expect(entries.length).toBeGreaterThan(0);
      done();
      // Here the done function is used to signal that this test relies upon the asynchronus execution
    });
  });
  /* A new test suite named "New Feed Selection" */

  describe('New Feed Selection', function() {
    let previousContent, newContent, previousContentArray, newContentArray, oldFeeds, newFeeds;

    // Before the test let's load a different feed selection, the default one is the one with 0 as argument
    beforeEach(function(done) {
      loadFeed(0, function() {
        // Load the first feed and save it's feed selection
        previousContent = document.getElementsByClassName("feed");
        previousContentArray = [...previousContent];
        for (element of previousContentArray) {
          oldFeeds += element.innerHTML;
        }
      });
      // Now load a different feed selection
      loadFeed(1, function() {
        done();
      });
    });

    /* A test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * , loadFeed() is asynchronous.
    */

    it('should have different content', function(done) {
      // Now that another feed selection is loaded let's save it
      newContent = document.getElementsByClassName("feed");
      newContentArray = [...newContent];
      for (element of newContentArray) {
        newFeeds += element.innerHTML;
      }
      // We expect that the new selection loaded is different than the first one
      expect(newFeeds).not.toBe(oldFeeds);
      done();
    });
  });
}());
