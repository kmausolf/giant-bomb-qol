var a1 = $.ajax({
            url: 'https://www.giantbomb.com/api/video/2300-11894/',
            dataType: 'json',
            data: { api_key: '5a510947131f62ca7c62a7ef136beccae13da2fd',
                    field_list: 'id,video_type',
                    format: 'json'
                  }
         }),
    a2 = a1.then(function(data) {
            var current_video_id = data.results.id;
            // var video_type       = 'video_type:' + data.results.video_type;
            var video_type       = 'video_type:2';

            return $.ajax({
              url: 'https://www.giantbomb.com/api/videos/',
              dataType: 'json',
              data: { api_key: '5a510947131f62ca7c62a7ef136beccae13da2fd',
                      field_list: 'image,name,site_detail_url',
                      filter: video_type,
                      format: 'json'
                    }
            });
         });

a2.done(function(data) {
  console.log(data.results[0].image.thumb_url);
  console.log(data.results[0].name);
  console.log(data.results[0].site_detail_url);
  var prev_video_image = data.results[0].image.thumb_url;
  var prev_video_name  = data.results[0].name;
  var prev_video_url   = data.results[0].site_detail_url;

  var next_video_image = data.results[1].image.thumb_url;
  var next_video_name  = data.results[1].name;
  var next_video_url   = data.results[1].site_detail_url;

  var html = [
      '<div id="qol_prev_vid">',
      '<a id="qol_prev_vid_link" href="' + prev_video_url + '">',
      '<div><span>' + prev_video_name + '</span>',
      '<img src="' + prev_video_image + '">',
      '</div></a></div>',
      '<div id="qol_next_vid">',
      '<a id="qol_next_vid_link" href="' + next_video_url + '">',
      '<img src="' + next_video_image + '">',
      '<span>' + next_video_name + '</span></a></div>'
    ].join('');

  var div = document.createElement('div');
  div.setAttribute("id", "qol_video_navigator")
  div.setAttribute('class', 'tab-pane active');
  div.innerHTML = html;

  var parentElement = document.getElementsByClassName('tab-content')[0];
  parentElement.insertBefore(div, parentElement.firstChild);

  var img = document.createElement('img');
  img.src = browser.extension.getURL('img/prev.png');
  parentElement = document.getElementById('qol_prev_vid_link');
  parentElement.insertBefore(img, parentElement.firstChild);

  img = document.createElement('img');
  img.src = browser.extension.getURL("img/next.png");
  img.setAttribute('id', 'qol_next_vid_arrow');
  parentElement = document.getElementById('qol_next_vid_link');
  parentElement.appendChild(img);
});
