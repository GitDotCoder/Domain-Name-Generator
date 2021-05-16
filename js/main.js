var merge;
function combine_input() {
  document.getElementById("domain_result_div").innerHTML = "";
  var string1 = document.getElementById("input_text_keyword").value;
  string1 = string1.replace(/[^A-Za-z0-9]+/g, " "); //replace everthing except numbers and letters with a space
  var n1 = string1.split(" "); //put into array

  var string2 = document.getElementById("input_text_prefix_suffix").value;
  string2 = string2.replace(/[^A-Za-z0-9]+/g, " ");
  var n2 = string2.split(" ");

  var checkboxes = document.getElementsByName("tld");
  //console.log(checkboxes);
  var tldChecked = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      tldChecked.push(checkboxes[i].value);
    }
  }
  //console.log(tldChecked);

  merge = n1
    .map(function (keyword) {
      return n2.map(function (prefix_suffix) {
        return tldChecked.map(function (ext) {
          //alert(keyword);

          if (prefix_suffix && keyword) {
            dom_arr = [
              keyword + prefix_suffix + ext,
              prefix_suffix + keyword + ext,
            ];
          } else if (keyword) {
            dom_arr = [keyword + prefix_suffix + ext];
          } else if (prefix_suffix) {
            dom_arr = [prefix_suffix + keyword + ext];
          } else {
            dom_arr = [];
          }
          return dom_arr;
          //console.log( [keyword + prefix_suffix + ext, prefix_suffix + keyword + ext] );
        });
      });
    })
    .flat()
    .flat()
    .flat();

  for (const dom of merge) {
    var result_html = `
								<div class="domain_div mt-4 mr-4">
										<span class="image_status">
											<img width="57" height="53" src="assets/domain_avl.svg">
										</span>
										<span class="domains-name">
											${dom}
										</span>
								</div>`;
    document.getElementById("domain_result_div").innerHTML += result_html;
  }
}
