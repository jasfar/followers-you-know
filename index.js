var Twitter = require('twitter');
var config = require('./config');

var client = new Twitter(config);

var username = process.env.USERNAME;
var params = { screen_name: username, stringify_ids: true };

var first_degree_list = [];
var second_degree_list = [];

function collect_data(params) {
	get_request('friends/ids', params, function(first_degree) {
		first_degree_list = first_degree_list.concat(first_degree.ids);

		if (first_degree.next_cursor > 0) {
			setTimeout(function() {
				params.cursor = first_degree.next_cursor;
				collect_data(params);
			}, 60 * 1000);
		} else {
			var index = 0;

			function loop() {
				writeProgress();

				setTimeout(function() {
					get_second_degree({ user_id: first_degree_list[index], stringify_ids: true }, function() {
						if (index < first_degree_list.length - 1) {
							index++;
							loop();
						} else {
							index++;
							writeProgress();
							show_results(second_degree_list.length);
						}
					});
				}, 60 * 1000);
			}

			function writeProgress() {
				process.stdout.clearLine();
				process.stdout.cursorTo(0);
				process.stdout.write('Progress: ' + index + '/' + first_degree.ids.length);
			}

			function get_second_degree(params, callback) {
				get_request('friends/ids', params, function(second_degree) {
					for (var i = 0; i < second_degree.ids.length; i++) {
						var existing_entry = false;

						for (var j = 0; j < second_degree_list.length; j++) {
							if (second_degree.ids[i] === second_degree_list[j].id) {
								existing_entry = true;
								second_degree_list[j].len++;
								break;
							}
						}

						if (!existing_entry) {
							second_degree_list.push({ id: second_degree.ids[i], len: 1 });
						}
					}

					if (second_degree.next_cursor > 0) {
						setTimeout(function() {
							params.cursor = second_degree.next_cursor;
							get_second_degree(params, callback);
						}, 60 * 1000);
					} else {
						callback();
					}
				});
			}

			function show_results(num_results) {
				if (num_results > second_degree_list.length) {
					num_results = second_degree_list.length;
				}

				process.stdout.write('\n');
				console.log('Results:');

				second_degree_list.sort(function(a, b) {
					return b.len - a.len;
				});

				var i = 0;

				function get_username() {
					if (i < num_results) {
						setTimeout(function() {
							get_request('users/show', { user_id: second_degree_list[i].id }, function(user) {
								second_degree_list[i].username = user.screen_name;
								console.log('  @' + second_degree_list[i].username + ' (' + second_degree_list[i].len + ')');
								i++;
								get_username();
							});
						}, 1 * 1000);
					}
				}

				get_username();
			}

			loop();
		}
	});
}


function get_request(request, params, callback) {
	client.get(request, params, function(error, data, response) {
		if (error) {
			if (error[0].code === 88) {
				setTimeout(function() {
					get_request(request, params, callback);
				}, 60 * 1000);
			} else {
				process.stdout.write('\n');
				console.log(error);
			}
		} else {
			callback(data);
		}
	});
}

collect_data(params);
