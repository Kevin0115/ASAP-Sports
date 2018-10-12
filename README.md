# ASAP-Sports
Mobile application that allows you to find and join other athletes in your area in casual/competitive sports.

## STYLE GUIDELINES **READ THIS**
2 SPACES not tabs; CTRL+A, use "Convert indentions to Spaces", width 2 (Just change your editor so that tabs default to 2 spaces)\
\For JSX tags with >= 2 attributes, newline them.
Example:
```
<Button
    title="Create a Game"
    color="#fff"
    onPress={() => this.props.navigation.navigate('Sport')}
/>
````

## Screen Descriptions (for dev team reference)
Following is a description of what each of the screens should display.

**Important**
Beginning with Gametype, props must be propagated and passed through each screen until **ReviewDetails** where all props (user input) are submitted through the API.

### Homescreen
The homescreen.

![](mockups/1_Homescreen_MVP.png)

### Gametype
The screen where user selects the sport

![](mockups/2_Gametype_MVP.png)

### BrowseGames
The search results of the user-selected sport. Has a toggleable filter window with four sliders: time, date, location, and competitive level

![](mockups/3_Browse_MVP.png)

### GameInfo
The first screen of game creation. Should include Title, Game Description, Competitive Level, and Number of players, respectively.

![](mockups/4_GameInfo_MVP.png)

### TimeDate
The second screen of game creation. User selects an exact time(range) and date for the game using selectors (lookup the right react native component for this)

![](mockups/5_TimeDate_MVP.png)


### Location
The third screen of game creation. User enters a simple plaintext address of the game.

![](mockups/6_Location_MVP.png)

### ReviewDetails
The fourth and final screen of game creation. The user is shown all of their inputted information and is asked to clarify and submit. Upon submission, the API call is made to create the game.

![](mockups/7_Confirmation_MVP.png)

### ConfirmMessage
A simple confirmation message telling the use that their game has been created.
![](mockups/8_Done_MVP.png)
