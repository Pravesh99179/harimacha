Dropdown for picking one option (pack size, sort order).

```jsx
<Select label="Pack size" value={v} onChange={setV} options={[{value:'30',label:'30 g',meta:'₹599'}]} />
```

- `meta` renders right-aligned secondary text (price, count).
