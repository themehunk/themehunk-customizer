<?php 
/**
 * all customizer setting includeed
 *
 * @param  
 * @return mixed|string
 */
function amaz_store_plugin_customize_register( $wp_customize ){
//Front Page
// require THEMEHUNK_CUSTOMIZER_PLUGIN_PATH . 'amaz-store/customizer/section/frontpage/top-slider.php';
require THEMEHUNK_CUSTOMIZER_PLUGIN_PATH . 'amaz-store/customizer/section/frontpage/category-tab.php';
require THEMEHUNK_CUSTOMIZER_PLUGIN_PATH . 'amaz-store/customizer/section/frontpage/product-slide.php';
require THEMEHUNK_CUSTOMIZER_PLUGIN_PATH . 'amaz-store/customizer/section/frontpage/category-slider.php';
require THEMEHUNK_CUSTOMIZER_PLUGIN_PATH . 'amaz-store/customizer/section/frontpage/product-list.php';

require THEMEHUNK_CUSTOMIZER_PLUGIN_PATH . 'amaz-store/customizer/section/frontpage/ribbon.php';
require THEMEHUNK_CUSTOMIZER_PLUGIN_PATH . 'amaz-store/customizer/section/frontpage/banner.php';
require THEMEHUNK_CUSTOMIZER_PLUGIN_PATH . 'amaz-store/customizer/section/frontpage/higlight.php';

// product shown in front Page
 $wp_customize->add_setting('amaz_store_prd_shw_no', array(
            'default'           =>'20',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' =>'amaz_store_sanitize_number',
        )
    );
    $wp_customize->add_control('amaz_store_prd_shw_no', array(
            'type'        => 'number',
            'section'     => 'amaz-store-woo-shop',
            'label'       => __( 'No. of product to show in Front Page', 'amaz-store' ),
            'input_attrs' => array(
                'min'  => 10,
                'step' => 1,
                'max'  => 1000,
            ),
        )
    ); 

}
add_action('customize_register','amaz_store_plugin_customize_register');