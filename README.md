<b>Introduction</b>

Dear Kanda Weather Group,

in the following we will describe our approach towards solving the task of developing an UI dashboard that displays valuable weather information.

The three main 'technologies' used to develop our application are React, Node.js and Typescript. 

Additionally, to order and access the given information better, we've developed a file system which is based on individual .json files. These are used instead of the raw .txt files we've been given as templates. With this change, sorting information becomes easier, as the individual file names indicate the date of the given forecasts (pattern: ddmmyyyy.json), thus rendering multiple accesses in order to find the correct date/forecast useless. At the same time, accessing data becomes less of a hassle both memory-wise and time-wise, as it's a direct process: either the fetch returns a result, or it doesn't find anything; it doesn't search for data, which would've been the case had we used .txt files.
(Note: the code for finding the correct forecast using the .txt files can still be found in FetchForecasts.ts)

In order to implement that which is described above, we manually transcribed the given data from the .txt file to individual .json files. This would constitute a necessary adjustment: the input has to be saved according to our method in order for the maximal efficiency to be guaranteed. Also, in this system forecasts can be changed with a lot less effort, as it is more user-friendly due to its readability. Another advantage of this system is that new locations can be smoothly added using our locations.json file, which means that our application is also expandable to more regions.

In addition to using the given data from the forecast (or rather hindcast) templates, we've also implemented a function to fetch the soil moisture for a given region and date using the dClimate API. If a certain level of flood risk is reached, the user is notified accordingly. Similarly, we have added a display for the air quality of the region, which is made using the open-source OpenAQ API. The user will also be notified if the air quality is particularly bad. 

<b>Usage</b>

As for the UI itself, the user first has to select the region he wants. Next, there are two possibilities to view data for a certain date in the preferred region: one can either scroll through the dates (which also shows previews for the dates which the user passes), or one can simply choose a desired date from the calendar above. Either way, when a date is chosen, the application fetches the data locally (from the .json files) and online (from the APIs) and displays it in a simple, readable way. To assure interactivity, we've also added a button to toggle dark mode and the ability to change the language of the application. Also, the design of the app has been built from the ground up with a "mobile first" approach, so that it can satisfy users on any device.

<b>Building and running the application</b>

In order to build the application, you will first need to run "npm i" to install all required dependencies into the project folder. Afterwards run "npm run build" in a terminal at the root of the project folder. After the build operation is done, you should see a new folder, called "build". Next, you will need to run the command "node server", again at the root of the project, in order to run the server application. The server will start on port 4000, after which you should see the message "Server started at port 4000" in the console. Afterwards go to the url "localhost:4000" and there you'll be able to use and test our dashboard.

