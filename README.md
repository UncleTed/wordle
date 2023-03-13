# wordle
wordle -h --help

wordle -g --good-letters

wordle -b --bad-letters

wordle -s --starting-word



Find the local storage so I can grab the stats automagically

/home/phred/.mozilla/firefox/at2c6vcr.default-release


sqlite> .schema
CREATE TABLE webappsstore2 (originAttributes TEXT, originKey TEXT, scope TEXT, key TEXT, value TEXT);
CREATE UNIQUE INDEX origin_key_index ON webappsstore2(originAttributes, originKey, key);
 select * from webappsstore2 where originKey like '%moc.semityn.www%';
select value from webappsstore2 where originKey like '%moc.semityn.www%' and key = 'nyt-wordle-statistics';
{"currentStreak":9,"maxStreak":11,"guesses":{"1":0,"2":3,"3":15,"4":15,"5":1,"6":1,"fail":3},"winPercentage":92,"gamesPlayed":38,"gamesWon":35,"averageGuesses":3}

