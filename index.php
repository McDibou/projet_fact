<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="img/pawprint.svg" />
    <title>FACT.ANIMALS</title>
</head>
<body>

<div id="layout"></div>

<div class="search">
    <div class="text title"><img src="img/pawprint.svg" alt="empreinte animal"><p>FACTS.ANIMALS</p></div>
    <div>
        <div class="text"><p>Categories :</p></div>
        <ul class="type-animal">
            <label for="cat">
                <input id="cat" type="checkbox" value="cat" name="animal_type">
                <p>CAT</p>
            </label>

            <label for="dog">
                <input id="dog" type="checkbox" value="dog" name="animal_type">
                <p>DOG</p>
            </label>

            <label for="horse">
                <input id="horse" type="checkbox" value="horse" name="animal_type">
                <p>HORSE</p>
            </label>

        </ul>
        <div class="text"><p>Choose more fact :</p></div>
        <input id="slider" type="range" value="1" name="amount" min="1" max="9" step="1">
        <label id="value"><p>1</p></label>

        <button type="submit" id="search"><p>SEARCH</p></button>
        <button type="submit" id="stockage"><p>FAVORIES</p></button>
        <button type="submit" id="delete"><p>DELETE ALL FAVORIES</p></button>
    </div>
</div>

<div id="loader" class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>

<div id="container">
    <div id="card"></div>
</div>

</body>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="js/app.js"></script>
</html>