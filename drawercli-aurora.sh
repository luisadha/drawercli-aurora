#!/data/data/com.termux/files/usr/bin/env bash

# MIT License

# Copyright (c) 2025 Luis Adha

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
set -xv 

IFS=''
apps=$(
  pm list packages --user 0 -3 2>&1 </dev/null | while read -r line; do
    pkg=${line#package:}
    # ambil main activity
    main=$(pm resolve-activity --user 0 \
        -a android.intent.action.MAIN \
        -c android.intent.category.LAUNCHER \
        "$pkg" 2>&1 </dev/null | grep "name=" | head -n1 | sed 's/.*name=//')
    
    # ambil apk path
    apk_path=$(pm path "$pkg" --user 0 2>&1 </dev/null | sed 's/package://; s/=$pkg//' | head -n1)
    
    # ambil label aplikasi
    label=$(aapt dump badging "$apk_path" 2>/dev/null \
              | grep "application-label:" \
              | sed "s/.*application-label:'//; s/'//")

    if [ -n "$main" ] && [ -n "$label" ]; then 
cat <<EOF > ~/.shortcuts/"$label"
am start --user 0 -n "$pkg/$main"
EOF
    fi
  done
)
set +xv
