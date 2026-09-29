export type Lang = 'ru' | 'en';

export interface Translations {
  readonly lead: string;
  readonly sections: {
    readonly basic: string;
    readonly custom: string;
    readonly pos: string;
    readonly width: string;
    readonly slots: string;
    readonly multi: string;
    readonly themes: string;
    readonly anims: string;
    readonly z: string;
    readonly aria: string;
    readonly close: string;
    readonly customLabels: string;
    readonly redux: string;
  };
  readonly basic: {
    readonly title: string;
    readonly body: string;
  };
  readonly customToggle: {
    readonly title: string;
    readonly trigger: string;
    readonly body: string;
  };
  readonly positions: {
    readonly title: string;
    readonly hint: string;
    readonly body: string;
  };
  readonly positionLabels: readonly {
    readonly uid: string;
    readonly position: string;
    readonly label: string;
  }[];
  readonly widths: {
    readonly title: string;
    readonly hint: string;
    readonly tryResize: string;
  };
  readonly widthTitles: readonly {
    readonly uid: string;
    readonly title: string;
    readonly description: string;
  }[];
  readonly slots: {
    readonly title: string;
    readonly hint: string;
    readonly okToggle: string;
    readonly okHeader: string;
    readonly okBody: string;
    readonly footerToggle: string;
    readonly footerHeader: string;
    readonly footerBody: string;
    readonly cancel: string;
    readonly save: string;
  };
  readonly multi: {
    readonly title: string;
    readonly hint: string;
    readonly bodyA: string;
    readonly bodyB: string;
  };
  readonly themes: {
    readonly title: string;
    readonly hint: string;
    readonly bg: string;
    readonly border: string;
    readonly radius: string;
    readonly shadow: string;
  };
  readonly themeTitles: readonly {
    readonly uid: string;
    readonly title: string;
    readonly description: string;
  }[];
  readonly animations: {
    readonly title: string;
    readonly hint: string;
    readonly durationLabel: string;
    readonly typeLabel: string;
    readonly timingLabel: string;
    readonly timingHint: string;
    readonly customValue: string;
    readonly animBody: string;
  };
  readonly animationLabels: readonly {
    readonly uid: string;
    readonly animation: string;
    readonly label: string;
  }[];
  readonly timingDescriptions: readonly {
    readonly uid: string;
    readonly timing: string;
    readonly label: string;
    readonly description: string;
  }[];
  readonly zIndex: {
    readonly title: string;
    readonly hint: string;
    readonly default: string;
    readonly medium: string;
    readonly max: string;
  };
  readonly accessibility: {
    readonly title: string;
    readonly hint: string;
    readonly fromTitle: string;
    readonly custom: string;
    readonly noTitle: string;
    readonly customBody: string;
    readonly noTitleBody: string;
  };
  readonly close: {
    readonly title: string;
    readonly hint: string;
    readonly defaultTitle: string;
    readonly defaultBody: string;
    readonly noOutsideTitle: string;
    readonly noOutsideBody: string;
    readonly noEscapeTitle: string;
    readonly noEscapeBody: string;
    readonly manualTitle: string;
    readonly manualBody: string;
  };
  readonly labels: {
    readonly title: string;
    readonly hint: string;
    readonly defaultTitle: string;
    readonly defaultBody: string;
    readonly customTitle: string;
    readonly customBody: string;
    readonly ruTitle: string;
    readonly ruBody: string;
  };
  readonly redux: {
    readonly title: string;
    readonly hint: string;
  };
}

const ru: Translations = {
  lead: 'Демонстрация библиотеки <code>@severfam/popover</code>: варианты открытия, позиционирования и режимов отображения.',
  sections: {
    basic: '1. Базовое открытие — иконка «?»',
    custom: '2. Свой переключатель — слот <code>.popover__toggle-content</code>',
    pos: '3. Варианты позиционирования — input <code>position</code>',
    width: '4. Кастомная и адаптивная ширина — input <code>width</code>',
    slots: '5. Слот заголовка, футера и кнопка «ok»',
    multi: '6. Режим <code>multi</code> — несколько открытых popover-ов',
    themes: '7. Темы оформления: фон, граница, тень, скругления, цвета',
    anims: '8. Анимации: тип, длительность и timing',
    z: '9. z-index — настраиваемый уровень наложения',
    aria: '10. Доступность — input <code>[ariaLabel]</code>',
    close: '11. Поведение закрытия — <code>[closeOnOutsideClick]</code> и <code>[closeOnEscape]</code>',
    customLabels: '12. Кастомные подписи — <code>[okLabel]</code>, <code>[closeAriaLabel]</code>',
    redux: '13. Состояние в Redux DevTools',
  },
  basic: {
    title: 'Подсказка',
    body: 'Базовый popover открывается кликом по иконке. Содержимое проецируется через слот <code>.popover__body-content</code>.',
  },
  customToggle: {
    title: 'Свой переключатель',
    trigger: 'Что это за сумма?',
    body: 'Спроецированный в слот <code>.popover__toggle-content</code> элемент становится переключателем popover-а.',
  },
  positions: {
    title: 'Позиция popover-а задаётся относительно переключателя.',
    hint: '',
    body: 'Popover с position=',
  },
  positionLabels: [
    { uid: 'demo-position-auto', position: 'auto', label: 'auto — под переключателем' },
    { uid: 'demo-position-auto-bottom', position: 'auto-bottom', label: 'auto-bottom — снизу со стрелкой' },
    { uid: 'demo-position-top', position: 'top', label: 'top — сверху со стрелкой' },
    { uid: 'demo-position-top-bottom', position: 'top-bottom', label: 'top-bottom — сверху без стрелки' },
    { uid: 'demo-position-right', position: 'right', label: 'right — справа' },
    { uid: 'demo-position-right-top', position: 'right-top', label: 'right-top — справа сверху' },
    { uid: 'demo-position-right-bottom', position: 'right-bottom', label: 'right-bottom — справа снизу' },
    { uid: 'demo-position-left', position: 'left', label: 'left — слева' },
    { uid: 'demo-position-left-top', position: 'left-top', label: 'left-top — слева сверху' },
    { uid: 'demo-position-left-bottom', position: 'left-bottom', label: 'left-bottom — слева снизу' },
    { uid: 'demo-position-bottom', position: 'bottom', label: 'bottom — снизу со стрелкой' },
  ],
  widths: {
    title: 'Пользователь может задать любую ширину панели: строку (<code>\'420px\'</code>, <code>\'80vw\'</code>), число в пикселях (<code>360</code>) или <strong>адаптивный объект</strong> <code>&#123; default: \'540px\', mobile: \'280px\' &#125;</code> для отдельной ширины на десктопе и смартфонах. Также поддерживаются <code>minWidth</code> и <code>maxWidth</code>.',
    hint: '',
    tryResize: 'Попробуйте изменить размер окна браузера (или включить режим мобильного устройства в DevTools), чтобы увидеть, как панель адаптируется под экран!',
  },
  widthTitles: [
    { uid: 'demo-width-responsive', title: 'Адаптивная: десктоп 540px / мобилка 280px', description: '[width]="{ default: \'540px\', mobile: \'280px\' }" — широкая на компьютере, компактная на смартфонах' },
    { uid: 'demo-width-fixed-string', title: 'Фиксированная ширина: 420px', description: 'width="420px" — строковое значение с единицами измерения' },
    { uid: 'demo-width-number', title: 'Числовое значение: 360', description: '[width]="360" — число автоматически переводится в 360px' },
    { uid: 'demo-width-clamp', title: 'Ограничения minWidth / maxWidth', description: '[width]="\'100%\'" [minWidth]="260" [maxWidth]="480" — гибкая ширина в заданных рамках' },
  ],
  slots: {
    title: 'Заголовок можно задать инпутом <code>title</code> или спроецировать через слот <code>.popover__header-content</code>. В подвале можно разместить кастомные кнопки через слот <code>.popover__footer-content</code> или стандартную кнопку подтверждения через <code>[okClose]="true</code>.',
    hint: '',
    okToggle: 'Ставка и условия',
    okHeader: 'Заголовок из слота',
    okBody: 'Заголовок из слота и кнопка подтверждения «ok» в подвале popover-а.',
    footerToggle: 'кастомный футер',
    footerHeader: 'Свой футер',
    footerBody: 'Футер содержит произвольные кнопки через слот <code>.popover__footer-content</code>.',
    cancel: 'Отмена',
    save: 'Сохранить',
  },
  multi: {
    title: 'В режиме <code>[multi]="true"</code> открытие одного popover-а не закрывает остальные: откройте оба переключателя подряд.',
    hint: '',
    bodyA: 'Откройте следом popover B — этот останется открытым.',
    bodyB: 'Оба popover-а могут быть открыты одновременно.',
  },
  themes: {
    title: 'Каждый popover может принимать локальную тему через input <code>[theme]="..."</code> или наследоваться от глобального <code>providePopoverConfig</code>. Ниже представлены пресеты с разными комбинациями фона, границы, скругления и акцентов:',
    hint: '',
    bg: 'Фон',
    border: 'Граница',
    radius: 'Скругление',
    shadow: 'Тень',
  },
  themeTitles: [
    { uid: 'demo-theme-dark', title: 'Dark / Ночная тема', description: 'Тёмный фон #0f172a, граница #334155, акцент #38bdf8' },
    { uid: 'demo-theme-emerald', title: 'Emerald / Мятная тема', description: 'Мятный фон #f0fdf4, акцентная граница 2px solid #86efac, скругление 20px' },
    { uid: 'demo-theme-sharp', title: 'Sharp / Чёткие углы (Neo-brutalist)', description: 'Радиус 2px, контрастная граница 2px solid #000, плотная тень' },
    { uid: 'demo-theme-purple', title: 'Violet / Фиолетовый акцент', description: 'Фон #faf5ff, граница 1px solid #c084fc, акцент #9333ea, радиус 16px' },
    { uid: 'demo-theme-amber', title: 'Warm Amber / Тёплый янтарь', description: 'Кремовый фон #fffbeb, граница 1px solid #fcd34d, радиус 8px' },
  ],
  animations: {
    title: 'Тип анимации задаётся через <code>[animation]</code>, длительность — через <code>[animationDuration]</code> (число в миллисекундах или строка вида <code>\'0.4s\'</code>), а скорость — через <code>[animationTiming]</code> (CSS timing-function). Попробуйте разные комбинации.',
    hint: '',
    durationLabel: 'Длительность',
    typeLabel: 'Тип анимации',
    timingLabel: 'Timing function — <code>[animationTiming]</code>',
    timingHint: 'Управляет скоростью анимации. По умолчанию <code>cubic-bezier(0.16, 1, 0.3, 1)</code>.',
    customValue: 'Своё значение:',
    animBody: 'Панель использует анимацию',
  },
  animationLabels: [
    { uid: 'demo-anim-zoom', animation: 'zoom', label: 'zoom (по умолчанию из конфига)' },
    { uid: 'demo-anim-fade', animation: 'fade', label: 'fade (плавное появление)' },
    { uid: 'demo-anim-slide', animation: 'slide', label: 'slide (сдвиг сверху)' },
    { uid: 'demo-anim-none', animation: 'none', label: 'none (без анимации)' },
  ],
  timingDescriptions: [
    { uid: 'demo-timing-ease', timing: 'ease', label: 'ease', description: 'Стандартное CSS-ускорение — медленное начало и конец' },
    { uid: 'demo-timing-linear', timing: 'linear', label: 'linear', description: 'Линейное — равномерная скорость без ускорения' },
    { uid: 'demo-timing-ease-out', timing: 'ease-out', label: 'ease-out', description: 'Быстрое начало, замедление в конце — ощущение «приземления»' },
    { uid: 'demo-timing-ease-in-out', timing: 'ease-in-out', label: 'ease-in-out', description: 'Медленное начало и конец, быстрый разгон в середине' },
    { uid: 'demo-timing-spring', timing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', label: 'spring (cubic-bezier)', description: 'Пружина — лёгкое «перелётание» за целевое значение' },
  ],
  zIndex: {
    title: 'По умолчанию <code>z-index = 1</code>. Значение задаётся через input <code>[zIndex]</code> или тему <code>theme.zIndex</code>. Позволяет контролировать порядок наложения popover-ов относительно других элементов страницы.',
    hint: '',
    default: 'z-index = 1 — стандартный уровень.',
    medium: 'z-index = 10 — перекрывает предыдущий.',
    max: 'z-index = 100 — максимальный.',
  },
  accessibility: {
    title: 'По умолчанию панель получает <code>aria-label</code> из <code>title</code>. Кастомная подпись задаётся через <code>[ariaLabel]</code>. Без <code>title</code> и <code>ariaLabel</code> используется <code>aria-labelledby</code>, ссылающийся на внутренний заголовок.',
    hint: '',
    fromTitle: 'Заголовок из title',
    custom: 'Кастомная подпись для скринридера',
    noTitle: '',
    customBody: 'Заголовок визуально виден, но для скринридера используется кастомная подпись.',
    noTitleBody: 'Ссылка на внутренний &lt;div id="..."&gt;',
  },
  close: {
    title: 'По умолчанию popover закрывается и кликом вне, и по Escape. Отключите эти параметры, чтобы попробовать альтернативные варианты закрытия.',
    hint: '',
    defaultTitle: 'Стандартное поведение',
    defaultBody: 'Закрытие по клику вне и по Escape работают.',
    noOutsideTitle: 'Без клика вне',
    noOutsideBody: 'Клик вне не закрывает. Закрытие — только Escape или крестик.',
    noEscapeTitle: 'Без Escape',
    noEscapeBody: 'Escape не работает. Закрытие — клик вне или крестик.',
    manualTitle: 'Только крестик',
    manualBody: 'Ни клик вне, ни Escape не закрывают. Только кнопка «✕» в правом верхнем углу.',
  },
  labels: {
    title: 'Тексты кнопок и подписи для скринридеров настраиваются через input\'ы <code>[okLabel]</code> и <code>[closeAriaLabel]</code>, либо глобально через <code>providePopoverConfig(&#123; labels: &#123; ... &#125; &#125;)</code>.',
    hint: '',
    defaultTitle: 'Дефолтные подписи',
    defaultBody: 'Кнопка: <code>ok</code>, крестик aria: <code>Закрыть</code>',
    customTitle: 'Кастомные подписи',
    customBody: 'Кнопка: <code>Понял</code>, крестик aria: <code>Закрыть окно подсказки</code>',
    ruTitle: 'Русские подписи',
    ruBody: 'Кнопка: <code>Принять</code>, крестик aria: <code>Скрыть</code>',
  },
  redux: {
    title: 'Состояние всех popover-ов синхронизируется в глобальный <code>@ngrx/store</code> экшеном <code>updateComponentState</code> через хелпер <code>linkToGlobalState</code>. Ветка: <code>componentState[\'libs/PopoverState\']</code>.',
    hint: '',
  },
};

const en: Translations = {
  lead: 'Demonstration of the <code>@severfam/popover</code> library: open behaviors, positioning, and display modes.',
  sections: {
    basic: '1. Basic open — "?" icon',
    custom: '2. Custom trigger — slot <code>.popover__toggle-content</code>',
    pos: '3. Positioning options — input <code>position</code>',
    width: '4. Custom and responsive width — input <code>width</code>',
    slots: '5. Header slot, footer, and "ok" button',
    multi: '6. <code>multi</code> mode — multiple open popovers',
    themes: '7. Theming: background, border, shadow, radius, colors',
    anims: '8. Animations: type, duration, and timing',
    z: '9. z-index — customizable stacking level',
    aria: '10. Accessibility — input <code>[ariaLabel]</code>',
    close: '11. Close behavior — <code>[closeOnOutsideClick]</code> and <code>[closeOnEscape]</code>',
    customLabels: '12. Custom labels — <code>[okLabel]</code>, <code>[closeAriaLabel]</code>',
    redux: '13. Redux DevTools state',
  },
  basic: {
    title: 'Tooltip',
    body: 'Basic popover opens on icon click. Content is projected via the <code>.popover__body-content</code> slot.',
  },
  customToggle: {
    title: 'Custom trigger',
    trigger: 'What is this amount?',
    body: 'An element projected into the <code>.popover__toggle-content</code> slot becomes the popover trigger.',
  },
  positions: {
    title: 'Popover position relative to the trigger.',
    hint: '',
    body: 'Popover with position=',
  },
  positionLabels: [
    { uid: 'demo-position-auto', position: 'auto', label: 'auto — below trigger' },
    { uid: 'demo-position-auto-bottom', position: 'auto-bottom', label: 'auto-bottom — below with arrow' },
    { uid: 'demo-position-top', position: 'top', label: 'top — above with arrow' },
    { uid: 'demo-position-top-bottom', position: 'top-bottom', label: 'top-bottom — above without arrow' },
    { uid: 'demo-position-right', position: 'right', label: 'right — right side' },
    { uid: 'demo-position-right-top', position: 'right-top', label: 'right-top — right, top-aligned' },
    { uid: 'demo-position-right-bottom', position: 'right-bottom', label: 'right-bottom — right, bottom-aligned' },
    { uid: 'demo-position-left', position: 'left', label: 'left — left side' },
    { uid: 'demo-position-left-top', position: 'left-top', label: 'left-top — left, top-aligned' },
    { uid: 'demo-position-left-bottom', position: 'left-bottom', label: 'left-bottom — left, bottom-aligned' },
    { uid: 'demo-position-bottom', position: 'bottom', label: 'bottom — below with arrow (right-aligned)' },
  ],
  widths: {
    title: 'Set any panel width: string (<code>\'420px\'</code>, <code>\'80vw\'</code>), number in pixels (<code>360</code>), or a <strong>responsive object</strong> <code>&#123; default: \'540px\', mobile: \'280px\' &#125;</code> for separate desktop and mobile widths. <code>minWidth</code> and <code>maxWidth</code> are also supported.',
    hint: '',
    tryResize: 'Try resizing the browser window (or enable mobile device mode in DevTools) to see how the panel adapts to the screen!',
  },
  widthTitles: [
    { uid: 'demo-width-responsive', title: 'Responsive: desktop 540px / mobile 280px', description: '[width]="{ default: \'540px\', mobile: \'280px\' }" — wide on desktop, compact on mobile' },
    { uid: 'demo-width-fixed-string', title: 'Fixed width: 420px', description: 'width="420px" — string value with units' },
    { uid: 'demo-width-number', title: 'Numeric value: 360', description: '[width]="360" — number is automatically converted to 360px' },
    { uid: 'demo-width-clamp', title: 'minWidth / maxWidth constraints', description: '[width]="\'100%\'" [minWidth]="260" [maxWidth]="480" — flexible width within bounds' },
  ],
  slots: {
    title: 'Set the title via the <code>title</code> input or project it through the <code>.popover__header-content</code> slot. Place custom buttons in the footer via the <code>.popover__footer-content</code> slot or use the standard confirm button with <code>[okClose]="true"</code>.',
    hint: '',
    okToggle: 'Terms & conditions',
    okHeader: 'Title from slot',
    okBody: 'Title from slot and "ok" confirm button in the popover footer.',
    footerToggle: 'custom footer',
    footerHeader: 'Custom footer',
    footerBody: 'Footer contains arbitrary buttons via the <code>.popover__footer-content</code> slot.',
    cancel: 'Cancel',
    save: 'Save',
  },
  multi: {
    title: 'In <code>[multi]="true"</code> mode, opening one popover does not close others: try opening both triggers in sequence.',
    hint: '',
    bodyA: 'Open popover B next — this one stays open.',
    bodyB: 'Both popovers can be open simultaneously.',
  },
  themes: {
    title: 'Each popover can accept a local theme via the <code>[theme]="..."</code> input or inherit from the global <code>providePopoverConfig</code>. Below are presets with different combinations of background, border, radius, and accent colors:',
    hint: '',
    bg: 'Background',
    border: 'Border',
    radius: 'Radius',
    shadow: 'Shadow',
  },
  themeTitles: [
    { uid: 'demo-theme-dark', title: 'Dark theme', description: 'Dark background #0f172a, border #334155, accent #38bdf8' },
    { uid: 'demo-theme-emerald', title: 'Emerald theme', description: 'Mint background #f0fdf4, accent border 2px solid #86efac, radius 20px' },
    { uid: 'demo-theme-sharp', title: 'Sharp (Neo-brutalist)', description: 'Radius 2px, high-contrast border 2px solid #000, dense shadow' },
    { uid: 'demo-theme-purple', title: 'Violet accent', description: 'Background #faf5ff, border 1px solid #c084fc, accent #9333ea, radius 16px' },
    { uid: 'demo-theme-amber', title: 'Warm Amber', description: 'Cream background #fffbeb, border 1px solid #fcd34d, radius 8px' },
  ],
  animations: {
    title: 'Animation type is set via <code>[animation]</code>, duration via <code>[animationDuration]</code> (number in ms or string like <code>\'0.4s\'</code>), and speed via <code>[animationTiming]</code> (CSS timing-function). Try different combinations.',
    hint: '',
    durationLabel: 'Duration',
    typeLabel: 'Animation type',
    timingLabel: 'Timing function — <code>[animationTiming]</code>',
    timingHint: 'Controls animation speed. Default is <code>cubic-bezier(0.16, 1, 0.3, 1)</code>.',
    customValue: 'Custom value:',
    animBody: 'Panel uses animation',
  },
  animationLabels: [
    { uid: 'demo-anim-zoom', animation: 'zoom', label: 'zoom (config default)' },
    { uid: 'demo-anim-fade', animation: 'fade', label: 'fade (smooth appearance)' },
    { uid: 'demo-anim-slide', animation: 'slide', label: 'slide (slide from top)' },
    { uid: 'demo-anim-none', animation: 'none', label: 'none (no animation)' },
  ],
  timingDescriptions: [
    { uid: 'demo-timing-ease', timing: 'ease', label: 'ease', description: 'Standard CSS easing — slow start and end' },
    { uid: 'demo-timing-linear', timing: 'linear', label: 'linear', description: 'Linear — constant speed without acceleration' },
    { uid: 'demo-timing-ease-out', timing: 'ease-out', label: 'ease-out', description: 'Fast start, deceleration at end — "landing" feel' },
    { uid: 'demo-timing-ease-in-out', timing: 'ease-in-out', label: 'ease-in-out', description: 'Slow start and end, fast in the middle' },
    { uid: 'demo-timing-spring', timing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', label: 'spring (cubic-bezier)', description: 'Spring — slight overshoot past the target value' },
  ],
  zIndex: {
    title: 'Default is <code>z-index = 1</code>. Set via the <code>[zIndex]</code> input or <code>theme.zIndex</code>. Controls the stacking order of popovers relative to other page elements.',
    hint: '',
    default: 'z-index = 1 — standard level.',
    medium: 'z-index = 10 — overlaps the previous.',
    max: 'z-index = 100 — maximum.',
  },
  accessibility: {
    title: 'By default, the panel gets <code>aria-label</code> from <code>title</code>. A custom label is set via <code>[ariaLabel]</code>. Without <code>title</code> and <code>ariaLabel</code>, <code>aria-labelledby</code> is used, pointing to the internal header.',
    hint: '',
    fromTitle: 'Title from title',
    custom: 'Custom screen reader label',
    noTitle: '',
    customBody: 'Title is visually visible, but a custom label is used for screen readers.',
    noTitleBody: 'References internal &lt;div id="..."&gt;',
  },
  close: {
    title: 'By default, popover closes on outside click and Escape. Disable these to try alternative close behaviors.',
    hint: '',
    defaultTitle: 'Default behavior',
    defaultBody: 'Close on outside click and Escape work.',
    noOutsideTitle: 'No outside click',
    noOutsideBody: 'Outside click is disabled. Close via Escape or the close button only.',
    noEscapeTitle: 'No Escape',
    noEscapeBody: 'Escape is disabled. Close via outside click or the close button.',
    manualTitle: 'Close button only',
    manualBody: 'Neither outside click nor Escape work. Only the "✕" button in the top-right corner.',
  },
  labels: {
    title: 'Button texts and screen reader labels are configured via <code>[okLabel]</code> and <code>[closeAriaLabel]</code> inputs, or globally via <code>providePopoverConfig(&#123; labels: &#123; ... &#125; &#125;)</code>.',
    hint: '',
    defaultTitle: 'Default labels',
    defaultBody: 'Button: <code>ok</code>, close aria: <code>Close</code>',
    customTitle: 'Custom labels',
    customBody: 'Button: <code>Got it</code>, close aria: <code>Close tooltip</code>',
    ruTitle: 'Russian labels',
    ruBody: 'Button: <code>Accept</code>, close aria: <code>Hide</code>',
  },
  redux: {
    title: 'All popover state is synced to the global <code>@ngrx/store</code> via the <code>updateComponentState</code> action through the <code>linkToGlobalState</code> helper. Branch: <code>componentState[\'libs/PopoverState\']</code>.',
    hint: '',
  },
};

export const i18n: Record<Lang, Translations> = { ru, en };
