# Streamer - crowd surf news stream.

## Installation

1. Set up meteor: https://www.meteor.com/install
2. Set up react-meteor: https://github.com/reactjs/react-meteor

## Running locally

1. > cd streamer/
2. > meteor run

## Running remotely

live @ http://streamer.meteor.com/

1. deploy:

	meteor deploy streamer.meteor.com

2. access db:

	meteor mongo streamer.meteor.com

## Alpha Launch Features

[ ] Complete User system, with loging authentication, credentials, account reset/recovery, history

 	[x] Registration
	[x] Login
	[ ] Logout
	[ ] Recovery

	[ ] Users seeing their own bookmarks

		[x] Change User collection to include list of bookmarks that user has saved
		[x] Change plugin to be aware of what user is logged in to app
		[x] Change plugin to mutate this list when a user saves a bookmark
		[x] Create Meteor method to return all of these posts
		[ ] Create UI to display this stream

[ ] Public Stream

	[ ] Ranking algo

[ ] User Stream

[ ] Filtering

	[ ] Filter by tags
	[ ] Filter for Groups
	[ ] Filter for matched articles and chats

[ ] Chat

	[ ] Figure out how many people are in a chat conversation. Who can you talk to?

[ ] Turn off autopublish

[ ] Plugin integration: functionalities include adding urls, checking user credentials

[ ] Consistent UI / branding.

[ ] Performance on browsers.

[ ] Analytics

[ ] Clean Up (TODOS)
