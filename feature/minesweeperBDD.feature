Feature: Minesweeper
    # "" = valor de variable
    # <> = variable declarar en el example

    # "n" = cellNumber
    # "o" = cell
    # "" = cell empty
    # "." = hidden cell
    # "!" = mined symbol
    # "?" = uncertain symbol
    # "*" = mines
    # "o" = cell

    #definir como usar el mockdata

    Background:
        Given the user opens the app

    #Default
    @done
    Scenario: Default Board: All the cells are hidden
        Then on the board all the cells should be hidden

    @done
    Scenario: Default game flag counter value
        Then the value of "flagCounter" is "10"

    @done
    Scenario: Default game timer value
        Then the value of "timer" is "0"

    @done
    Scenario: Default Face on startup
        Then the face should be "bored"

    # #reveal
    # Revelar cela
    @done
    Scenario: Reavealing a cell without mine and without surrounding mines, will be empty
        Given the user loads in the board the following MockData: "ooo-ooo-ooo"
        When the user reveal the cell "1-1"
        Then the cell "2-2" should be "0"

    @done
    Scenario: Reveal cell mine and mine is exposed
        Given the user loads in the board the following MockData: "*o"
        When the user reveal the cell "0-0"
        Then the cell "0-0" should be mine

    @done
    Scenario: Reveal cell mine and finish the game
        Given the user loads in the board the following MockData: "*o"
        When the user reveal the cell "0-0"
        Then the user should lose

    @done
    Scenario: revealling all the mines when the game is Over
        Given the user loads in the board the following MockData: "**-o*"
        When the user reveal the cell "0-1"
        Then the user should be a mine on the cell "0-0"
        And the user should be a mine on the cell "1-1"

    @done
    Scenario: The user win the game when reveal all the cells that is not mine
        Given the user loads in the board the following MockData: "*o-o*"
        When the user reveal the cell "0-1"
        And the user reveal the cell "1-0"
        Then the user should be won

    @done
    Scenario Outline: reveal cell with not mine but is close and displaying the number of the mines is close [NUM CELL]
        Given the user loads in the board the following MockData: "<board>"
        When the user reveal the cell "1-1"
        Then the cell "1-1" should be "<NumberMinesClose>"

        Examples:
            | board       | NumberMinesClose |
            | *oo-ooo-ooo | 1                |
            | **o-ooo-ooo | 2                |
            | ***-ooo-ooo | 3                |
            | ***-*oo-ooo | 4                |
            | ***-*o*-ooo | 5                |
            | ***-*o*-*oo | 6                |
            | ***-*o*-**o | 7                |
            | ***-*o*-*** | 8                |

    # [EMPTY CELL]
    # Scenario: revealing surrounding cells when an empty cell is revealed
    #     Given the user loads in the board the following MockData: "ooo-ooo-ooo"
    #     When the user reveal the cell "1-1"
    #     Then all the cells should be empty

    @done
    Scenario: When the user reveals all the non mined cells, all the mines will be tagged as mined symbol
        Given the user loads in the board the following MockData: "**-oo"
        When the user reveal the cell "1-0"
        And the user reveal the cell "1-1"
        Then the cell "0-0" should be tagged as "mined"
        And the cell "0-1" should be tagged as "mined"
    
    @done
    Scenario: revealing sourronded cells when an empty cell is revealed by an adjacent cell
    Given the user loads in the board the following MockData: "*****-*ooo*-*ooo*-*ooo*-*****"
    When the user reveal the cell "2-2"
    And the cell "2-2" should be "0"
    Then the cell "1-1" would be revealed and should be "5"
    And the cell "1-2" would be revealed and should be "3"
    And the cell "1-3" would be revealed and should be "5"
    And the cell "2-1" would be revealed and should be "3"
    And the cell "2-3" would be revealed and should be "3"
    And the cell "3-1" would be revealed and should be "5"
    And the cell "3-2" would be revealed and should be "3"
    And the cell "3-3" would be revealed and should be "5"

    # Scenario: revealing sourronded cells when an empty cell is revealed by an adjacent cell
    #     Given the user loads in the board the following MockData:
    #         """
    #     *****
    #     *ooo*
    #     *ooo*
    #     *ooo*
    #     *****
    #         """
    #     When the cell "3-3" should be "0"
    #     Then the display baord should look like this: "*****-*ooo*-*ooo*-*ooo*-******"
    #         """
    #     *****
    #     *ooo*
    #     *ooo*
    #     *ooo*
    #     *****
    #         """


    #Flag(Mined Symbol)
    @done
    Scenario: Tagging a cell as mined when the user suspects that the cell contains a mine
        When the user tags as "mined" the cell "2-2"
        Then the cell "2-2" should be tagged as "mined"

    @done 
    Scenario: Untagging a mined cell
        Given the user tags as "mined" the cell "2-2"
        When the user untags the cell "2-2"
        Then the cell "2-2" shouldn't be tagged

    @done
    Scenario: Put a mined symbol with mouse
        When the user 1 click with righClick on the cell "2-2"
        Then the cell "2-2" should be tagged as "mined"
    
    @done
    Scenario: Remove a mined symbol with mouse
        Given the user tags as "mined" on the cell "2-2"
        When the user 2 click with righClick on the mined "2-2"
        Then the cell "2-2" shouldn't show information


    #Question Mark (Uncertain)
    @done
    Scenario: Mark a cell with a question mark when i don't have enough information
        When the user tags as "uncertain" the cell "2-2"
        Then the cell "2-2" should be tagged as "uncertain"

    @done
    Scenario: Untagging a uncertain symbol cell
        Given the user tags as "uncertain" the cell "2-2"
        When the user untags the cell "2-2"
        Then the cell "2-2" shouldn't be tagged

    @done
    Scenario: Put a uncertain symbol with mouse
        Given the user tags as "mined" the cell "1-1"
        When the user 1 click with righClick on the flag "1-1"
        Then the cell "1-1" should be tagged as "uncertain"
    
    @done
    Scenario: Remove a uncertain symbol with mouse
        Given the user tags as "uncertain" the cell "1-1"
        When the user 1 click with righClick on the flag "1-1"
        Then the cell "1-1" shouldn't show information


    #Flag Counter
    @done
    Scenario: Counter of mined symbol decrease when you placed a flag on a cell
        Given the "counter" is 10
        When the user tags as "mined" on the cell "1-1"
        Then the counter is 9
    
    @done
    Scenario: Counter of mined symbol increase when you remove a flag on a cell
        Given the "counter" is 10
        When the user untags as "mined" on the cell "1-1"
        Then the counter is 9


    #Timer
    @manual
    Scenario: The timer starts when the user reveal the first cell
        When the user reveal the cell "1-1"
        Then time begins should to add up

    @manual
    Scenario: The timer stop when the user reveal a mine
        When the user reveal the cell "mined"
        Then time should stop

    #Disable
    @done
    Scenario: Disable all the board when the user reveal a mine
        Given the user loads in the board the following MockData: "*o-o*"
        When the user reveal the cell "1-1"
        Then all the cells are disabled


    #Face
    @done
    Scenario:The user reset the board
        Given the user loads in the board the following MockData: "n!"
        When the user reset the board
        Then the cell "0-0" should be "hidden"
        And the cell "0-1" should be "hidden"
        And all the cell are enabled

    @done
    Scenario: Reset the board with press on the face
        Given the user loads in the board the following MockData: "*o-o*"
        When the user press on the face
        Then the board is reset

    @done
    Scenario: When the user win the game the face is happy
        Given the user loads in the board the following MockData: "*o-o*"
        When the user reveal the cell "0-1"
        And the user reveal the cell "1-0"
        Then the "face" should be "happy"

# comprobar si solo son * y o