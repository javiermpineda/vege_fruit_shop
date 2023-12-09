# Project Readme

## Overview

This project includes several modifications to address CORS issues and enhance the user experience in the login, checkout, and order sections. Below are the details of the changes made:

## Menu Correction

Corrections have been made to ensure that the menu appears correctly on the "About" and "Contact" pages.

## Login JS

The login JavaScript file has been modified to resolve CORS issues. The problem arose from cross-origin requests between JavaScript files. To prevent this, ensure that the login JavaScript file handles the login functionality without relying on direct cross-file calls.

## Checkout JS

Similar to the login section, the checkout JavaScript file has been updated to mitigate CORS problems. The changes involve restructuring the code to avoid cross-origin issues when one JavaScript file calls another.

## Order JS

The order JavaScript file has undergone adjustments to eliminate CORS-related challenges. The modifications focus on refining the code structure to prevent CORS problems that may arise from inter-file JavaScript calls.

## Order HTML

The order HTML file has been redesigned for an improved user interface. The layout enhancements provide a more visually appealing display. Additionally, the user interface now showcases all orders associated with the logged-in user. An option to view the detailed information of each order has been incorporated.




