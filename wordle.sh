#!/bin/bash 
build_good_letter_regex() {
    echo "(?=.{0,4}$1)"
}

random_starting_word() {
    readarray -t words < ./words.txt
    length_of_array=${#words[@]}
    random_word_index=$((1 + SRANDOM % ${length_of_array}))
    # echo ${random_word_index}
    echo ${words[random_word_index]}
    exit 0
}

while getopts g:b:s flag
do
    case "${flag}" in
        g) good_letters=${OPTARG};;
        b) bad_letters=${OPTARG};;
        s) random_starting_word
    esac
done

until [ -z $good_letters ]
do
    letter=${good_letters:0:1}
    good_regex=${good_regex}$(build_good_letter_regex $letter)
    good_letters="${good_letters#$letter}"
done


if [ -z $bad_letters ]; then
    grep -P "${good_regex}.{5}" words.txt
else 
    grep -P "${good_regex}.{5}" words.txt | grep -v [$bad_letters]
fi

