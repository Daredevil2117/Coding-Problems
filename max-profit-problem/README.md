# Max Profit Problem

Vanilla JavaScript, HTML, and CSS solution for finding the best mix of
buildings that maximizes profit after `n` units of time.

## Run

Open `index.html` in a browser.

## Rules

| Establishment | Build Time | Earnings |
| --- | ---: | ---: |
| Theatre | 5 units | $1500 per unit |
| Pub | 4 units | $1000 per unit |
| Commercial Park | 10 units | $2000 per unit |

Only one building can be developed at a time. Once a building is completed, it
earns money for every remaining unit of time.

## Sample Results

```text
Input: 7
Earnings: $3000
Solutions:
1. T: 1 P: 0 C: 0
2. T: 0 P: 1 C: 0

Input: 8
Earnings: $4500
Solutions:
1. T: 1 P: 0 C: 0

Input: 13
Earnings: $16500
Solutions:
1. T: 2 P: 0 C: 0
```

## Algorithm

The app tries every feasible count combination for Theatre, Pub, and Commercial
Park. For each combination, buildings are scheduled by highest earning per build
time first, then profit is calculated from the time each building has left after
completion.
