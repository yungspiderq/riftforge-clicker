# Riftforge · Осколки разлома

Riftforge — фэнтези-кликер про добычу осколков, путешествия между мирами и силу перерождения. Разбуди кристалл в Сумрачной шахте, доберись до Багровой бездны и собери свой набор постоянных навыков.

[Играть в браузере](https://yungspiderq.github.io/riftforge-clicker/) · [Скачать релиз](https://github.com/yungspiderq/riftforge-clicker/releases/latest)

## Запуск

Скачай и распакуй `Riftforge-v1.1.0.zip`, затем открой `index.html` в браузере. Для локальной игры достаточно HTML, CSS и JavaScript из архива. Сервер и интернет не нужны.

## Новое в v1.1 — Экспедиции Разлома

- **3 повторяемых контракта:** удары, Резонансы и добыча осколков. Цели растут после выполнения, а лишний прогресс переносится в следующий контракт.
- **Печати Разлома:** новая награда за контракты.
- **5 реликвий:** постоянные бонусы к ударам, пассивной добыче, общей добыче и длительности Резонанса.
- **Обратная совместимость:** сохранения v1.0 автоматически получают новые поля, без бесплатного начисления контрактов за старый прогресс. Реликвии и контракты не сбрасываются при перерождении.
- **Адаптивный интерфейс и статистика** экспедиций; автоматические тесты логики на GitHub Actions.


## Как играть

1. Нажимай на кристалл мышью, касанием или пробелом. Быстрые удары дают серию и заряжают Резонанс, который временно усиливает добычу.
2. Покупай улучшения в Кузнице. Часть из них усиливает удар, часть добывает осколки автоматически.
3. Переходи в новые миры по мере добычи осколков за цикл. У каждого из восьми миров свой множитель. Поручения дают дополнительные награды.
4. При перерождении начни новый цикл и получи эфир. Эфир даёт постоянный бонус, а в Древе за него можно открыть 14 навыков, включая критические удары, усиление Резонанса и бонусы к пассивной добыче.

Прогресс сохраняется в браузере. Пассивная добыча за время отсутствия начисляется максимум за 8 часов. В настройках можно скачать или загрузить JSON-сохранение, в том числе для переноса между локальной и онлайн-версиями.

<details>
<summary>Как создавались иллюстрации</summary>

Иллюстрации созданы встроенным инструментом ImageGen. Фон Сумрачной шахты находится в `assets/mine.webp`, остальные семь миров — в `assets/world-1.webp`–`assets/world-7.webp`.

**Сумрачная шахта**

> Use case: stylized-concept. Asset type: full-bleed hero environment background for an original premium dark-fantasy clicker game interface. A vast ruined Gothic observatory in a deep indigo mountain hollow at midnight. Thin towering ribbed gothic arches, jagged crystalline rocks on the edges, stone steps and a circular ruined dais in the lower center, distant small violet wisps and a couple of warm amber embers. A single colossal broken arch frames a misty starfield and vertical beam. Deep almost-black ink blue (#0b0d1b), royal violet, amethyst, occasional pale lavender rim lights. Detailed cinematic painterly 3D matte painting, convincing stone and atmospheric depth, moody but legible. Main focus in the center is a roughly football sized levitating VERY STRIKING large spiky faceted amethyst crystal heart, in a ball of magical violet light, finely detailed facets with white-hot pink highlights, centered at exactly 51 percent horizontally and 50 percent vertically. Scale of crystal is 26 percent of overall width, 49 percent overall height, direct straight-on view. Delicate occult concentric line circles floating around the crystal. Crystal is the ONE focal point. Leave upper 15 percent and lower 15 percent darker and less detailed for interface, make side edges also recede. Landscape 3:2 composition. No people, no lettering, no UI, no border or watermark.

**Атлас миров**

> Use case: stylized-concept. Asset type: contact sheet of eight dark fantasy video game environments, for programmatic cutting into tiles. Produce a precisely even 4 columns by 2 rows grid of independent full-bleed landscape miniature matte paintings, no margin, no gutter, absolutely no lettering or borders. Each tile has its own complete scene; use exact geometric quarters and halves of the overall wide landscape 3:2 canvas for tile edges. Dark high contrast sophisticated realistic 3D matte painting, strong depth, tiny glowing embers, dark edges, distinct color temperatures, center of each scene has a single angular levitating magical shard just above the center of the image, occupying roughly 35 percent height. Top row, in order: an indigo Gothic subterranean mine with an amethyst, blue moonlit ancient pine forest with a cyan crystal, sunken city and gothic towers amid deep blue water with a sapphire, volcanic temple among lava rivers with a bright orange ruby. Bottom row, in order: storm-swept floating rock towers in silver blue clouds with a sky-blue shard, cold snow-covered temple among glacial mountains with a white ice crystal, majestic black orbiting ruins in purple nebula with a magenta shard, immense eldritch abyss lit by a crimson eclipse with a fiery red crystal. No characters, no collage overlaps, no UI, no watermark.

</details>
