//
//  BehaviorLensApp.swift
//  BehaviorLens
//
//  Created by Jeremy Ellis on 2/9/25.
//

import SwiftUI
import SwiftData

@main
struct BehaviorLensApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .modelContainer(for: Item.self)
        }
    }
}
