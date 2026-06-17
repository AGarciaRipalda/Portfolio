/* Tweaks panel — drives the portfolio's visual variant, background
   pattern and ambient glow. Content stays plain HTML; this only
   flips CSS custom properties / data-attributes on <html>. */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "fusion",
  "bg": "dots",
  "glow": 0.85
}/*EDITMODE-END*/;

function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-variant', t.variant);
    root.setAttribute('data-bg', t.bg);
    root.style.setProperty('--glow', String(t.glow));
  }, [t.variant, t.bg, t.glow]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Dirección visual" />
      <TweakRadio
        label="Variante"
        value={t.variant}
        options={['fusion', 'cloud', 'electric']}
        onChange={(v) => setTweak('variant', v)}
      />
      <TweakSection label="Fondo" />
      <TweakRadio
        label="Retícula"
        value={t.bg}
        options={['dots', 'grid', 'off']}
        onChange={(v) => setTweak('bg', v)}
      />
      <TweakSlider
        label="Resplandor"
        value={t.glow}
        min={0}
        max={1.6}
        step={0.05}
        onChange={(v) => setTweak('glow', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<PortfolioTweaks />);
