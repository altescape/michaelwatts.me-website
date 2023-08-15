#!/bin/bash

HUGO_DIR="${1:-.}"
HUGOVER=$(cat hugo.version)
echo "Looking for hugo version $HUGOVER in $HUGO_DIR"
if [ -f $HUGO_DIR/hugo ]; then
  HUGOCURVER=$($HUGO_DIR/hugo version)
  if [[ $HUGOCURVER == *"$HUGOVER"* ]]; then
    echo "Required version of Hugo already present"
    exit 0
  fi
fi

TARFILE=hugo_extended_${HUGOVER}_Linux-64bit.tar.gz CHKFILE=hugo_${HUGOVER}_checksums.txt
wget -q https://github.com/gohugoio/hugo/releases/download/v${HUGOVER}/$TARFILE -O $TARFILE
wget -q https://github.com/gohugoio/hugo/releases/download/v${HUGOVER}/$CHKFILE -O $CHKFILE 
sha256sum --ignore-missing -c $CHKFILE || exit 1
tar xf $TARFILE --exclude='LICENSE' --exclude='README.md' -C $HUGO_DIR
rm -f $TARFILE $CHKFILE

sleep 1s

INSTALLED_VER=$($HUGO_DIR/hugo version)
echo "Installed $INSTALLED_VER to $HUGO_DIR"