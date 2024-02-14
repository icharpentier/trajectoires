<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <?php include "header.php";?>
    
    <main class="main-accueil">

<!-- Présentation du morphisme -->
<div class="MorphIntro">
    <div id="morphism" class="visu">
        <h2 class="NomCourbe">Morph 1</h2>
    </div>
    <div class="Detail">
        <h2>La description</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum error culpa ipsam quidem animi quibusdam, facere pariatur consectetur commodi esse nesciunt atque. Sed earum quasi, mollitia nobis enim esse!</p>
        <ul class="morph-menu">
            <li><a href="javascript:void(0);" onclick="goToPresentation('Morphisme1')">Voir le morphisme 1</a></li>
            <li><a href="javascript:void(0);" onclick="goToPresentation('Morphisme2')">Voir le morphisme 2</a></li>
        </ul>
    </div>
</div>

<!-- Description de la page -->
<div class="description">
    <h1>Qu'est ce que c'est ?</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nulla quod modi consectetur mollitia consequatur totam. Voluptas, odio! Exercitationem magnam, reiciendis distinctio sint fugiat quo quibusdam dolorum aliquid? Labore quibusdam illum necessitatibus, odit voluptatum, perferendis, aut nisi unde quidem nam accusantium commodi natus ex asperiores numquam accusamus sapiente a. Corporis, rem distinctio? Maiores repellendus eaque quibusdam dolor possimus saepe nobis veritatis facere voluptas sunt harum, sint fugiat optio ipsum ullam, perspiciatis ea vel. Suscipit consectetur earum perspiciatis, nostrum dicta harum in. Quidem, alias eum eius accusamus maxime nihil recusandae laudantium sit quod vitae ratione non mollitia, dignissimos quae ad aliquam voluptas quo eveniet quam. Temporibus illo et saepe earum officia nulla corrupti culpa ducimus. Quo, optio necessitatibus unde assumenda fugiat distinctio vel voluptatibus. Voluptas minima repudiandae, fuga laboriosam, blanditiis nostrum sunt libero possimus expedita officiis asperiores atque enim veniam necessitatibus impedit voluptate. Perspiciatis harum qui odio dicta! Iure vitae voluptatum quasi modi quo commodi esse doloribus tempore neque dicta quos laudantium fugit, temporibus ut amet sapiente vel vero error natus debitis. A aperiam nulla vero eos possimus. Nisi quae explicabo doloremque blanditiis perferendis! A pariatur perspiciatis odit obcaecati, dolore consequuntur soluta ab aperiam temporibus? Magnam, officiis. Corporis nam aliquam repellendus.</p>
</div>

<!-- Galerie des simulations disponibles sur le site -->
<div class="galerie">
    <div class="visu-wrap" id="deming-clique">
      <h2 class="NomCourbe">Deming</h2>
      <div id="deming" class="visu"></div>
    </div>
    <div class="visu-wrap" id="holling-clique">
      <h2 class="NomCourbe">Holling</h2>
      <div id="holling" class="visu"></div>
    </div>
    <div class="visu-wrap" id="lotka-clique">
        <h2 class="NomCourbe">Lotka-Volterra</h2>
        <div id="lotka" class="visu"></div>
      </div>
    <div class="visu-wrap" id="lorenz-clique">
      <h2 class="NomCourbe">Lorenz</h2>
      <div id="lorenz" class="visu"></div>
    </div>
  </div>

</main>

    <?php include "footer.php";?> 

    