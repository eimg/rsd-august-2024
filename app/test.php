<?php

function a() {
    echo "Function A\n";
}

function b() {
    sleep(2);
    echo "Function B\n";
}

function c() {
    echo "Function C\n";
}

a();
b();
c();