# Water Tank Problem

Vanilla JavaScript, HTML, and CSS solution for calculating trapped rain water
between blocks.

## Run

Open `index.html` in a browser.

## Example

Input:

```text
0,4,0,0,0,6,0,6,4,0
```

Output:

```text
18 Units
```

## Algorithm

For every position:

1. Store the highest block seen from the left.
2. Store the highest block seen from the right.
3. Water at that position is `min(leftMax, rightMax) - height`.

The final answer is the sum of all positive water values.
