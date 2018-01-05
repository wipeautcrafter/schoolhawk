# About SchoolHawk
SchoolHawk is a program written in NodeJS using Electron, and helps people with learning.

# Installation
## windows users
For windows users you can download git bash [here](https://git-scm.com/downloads) and follow the linux installation.
I removed the windows installer because of instability.

## linux users
```shell
// downloading the project
git clone https://github.com/wipeautcrafter/schoolhawk
// going into the project folder
cd schoolhawk
// setting up the nodejs packages
npm start
// starting schoolhawk
electron .
```
# Detailed Description
## Main Menu
In the main menu you get an overview of all the lists you have created.
You can either play, edit, download, print and delete these lists.

The play, edit, print and delete buttons are straight forward, 
but the download button downloads the list to your desktop in text form, so you can learn it.

You can also create a list, or upload one that you have leant from a friend.

## Create List
When you click the `+` in the top right in the main menu, you get brought here.
On the top you have 2 buttons, one for saving the list, and one for going back to the main menu.

You also see the input fields for the list.
You have one big input field, for the title of the list. This cannot contain ``_dashes`` and ``.list``.
The other input fields are the question and answer fields.
When you press tab on the last one it automatically creates a new input field.

## Upload List
Upon pressing the upload button in the top right in the main menu, you get a select file menu.
Here you can select the ``.list`` file that you received from your friend.
When you select it, it automatically removes ``_dashes`` and ``.list``, so it doens't corrupt the file.

## Flash Cards/Play
On the front of the card is the question, and on the back of the card the answer.
You think of the answer to the question inside your head.
Press **space** to flip the card, and check your answer.
If you had it incorrect press **he left arrow**,
and if you had it correct you press the **right arrow**.
you can also swipe **left**, **right**, **up** and **down**.

In the top right you can press the settings button.
There you can select the way you would like to be asked the questions.
If you select ``question-answer`` the question will be on the front of the card, and on the back the answer.
If you select ``answer-question`` the answer will be on the front, and the answer on the back.
If you select ``randomize`` it will be random each time.

You can press the question mark button in the top right for more information.
To go back to the main menu, press the back button in the top right.

## Edit Menu
The editing of a file works the same as creating a file,
except it has loaded in all information of the list you want to edit.

## Download Button
Upon clicking this button, it downloads your list to a .txt on your desktop.
This is handy for learning on your computer instead of printing it out.

## Print Button
Upon clicking the print button, your file will get printed out,
in the same format as when you download the file to your desktop.

## Delete List
When you click this button, you will get a confirmation.
If you click on ok, your list will be permanently deleted.

# license
Copyright 2018 Wipeautcrafter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
