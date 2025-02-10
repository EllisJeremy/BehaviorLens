//
//  Item.swift
//  BehaviorLens
//
//  Created by Jeremy Ellis on 2/9/25.
//

import Foundation
import SwiftData

// MARK: - Item Model
@Model
class Item {
    var text: String
    var date: Date
    
    init(text: String, date: Date = Date()) {
        self.text = text
        self.date = date
    }
}

