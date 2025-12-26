#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_updater::Builder::new().build())
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      
      // Auto-check for updates on startup (silent background check)
      #[cfg(not(debug_assertions))]
      {
        let app_handle = app.handle().clone();
        tauri::async_runtime::spawn(async move {
          if let Ok(update) = app_handle.updater().check().await {
            if update.is_update_available() {
              // Download and install silently
              let _ = update.download_and_install().await;
            }
          }
        });
      }
      
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
