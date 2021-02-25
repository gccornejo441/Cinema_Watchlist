const Users = require('../../models/userSchema');

function mySearch() {
    const inputVal = document.getElementById("searchVal");
  inputVal.addEventListener("click", () => {
    Users.findOne({ _id: req.user._id }, (err, user) => {
      const result = user.submittedMovies;
      if (result && result.length) {
        if (user != null) {
            console.log("Result: ", result);
          document.getElementById("demo").innerHTML += result;
        }
      }
    });
  });
}
