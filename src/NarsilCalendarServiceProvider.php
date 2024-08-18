<?php

namespace Narsil\Calendar;

#region USE

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;
use Narsil\Tree\Blueprints\NodeBlueprint;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class NarsilCalendarServiceProvider extends ServiceProvider
{
    #region PUBLIC METHODS

    /**
     * @return void
     */
    public function boot(): void
    {
        $this->bootTranslations();
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @return void
     */
    private function bootTranslations(): void
    {
        $this->loadJsonTranslationsFrom(__DIR__ . '/../lang', 'calendar');
    }


    #endregion
}
